'use server';

import { prisma } from '@utrecht/db';
import { computePrice, generateOrderCode } from '@utrecht/booking-engine';
import { z } from 'zod';

const schema = z.object({
  date: z.string(),                                       // YYYY-MM-DD
  locale: z.string(),
  items: z
    .array(
      z.object({
        providerSlug: z.string(),
        time: z.string(),                                 // HH:MM
        participants: z.number().int().min(1).max(200),
      }),
    )
    .min(1),
});

export async function createProgramOrder(input: z.infer<typeof schema>) {
  const data = schema.parse(input);

  // Haal providers + default product op
  const providers = await prisma.provider.findMany({
    where: { slug: { in: data.items.map((i) => i.providerSlug) }, bookable: true },
    include: { products: { where: { active: true }, take: 1 } },
  });

  const itemsData: any[] = [];
  let subtotal = 0;
  let vatTotal = 0;
  let costTotal = 0;

  for (const item of data.items) {
    const provider = providers.find((p) => p.slug === item.providerSlug);
    if (!provider) continue;
    const product = provider.products[0];
    if (!product) continue;

    const vatRate = Number(provider.vatRate);
    const price = computePrice({
      costCents: product.costPriceCents,
      tier: 'B2C',
      vatRate,
      marginOverride: provider.marginOverride ? Number(provider.marginOverride) : null,
    });
    const lineTotal = price.sellPriceCents * item.participants;
    const lineCost = product.costPriceCents * item.participants;
    const lineVat = Math.round((lineTotal * vatRate) / (1 + vatRate));

    subtotal += lineTotal - lineVat;
    vatTotal += lineVat;
    costTotal += lineCost;

    itemsData.push({
      productId: product.id,
      scheduledAt: new Date(`${data.date}T${item.time}`),
      participants: item.participants,
      unitCostCents: product.costPriceCents,
      unitPriceCents: price.sellPriceCents,
      vatRate,
      lineTotalCents: lineTotal,
      lineCostCents: lineCost,
      lineMarginCents: lineTotal - lineCost,
      channel: provider.channel,
    });
  }

  if (itemsData.length === 0) return { error: 'Geen boekbare onderdelen.' };

  const total = subtotal + vatTotal;
  const order = await prisma.order.create({
    data: {
      publicCode: generateOrderCode('UN'),
      domain: 'UTRECHTNOW',
      locale: data.locale as any,
      status: 'CART',
      customerEmail: '',
      subtotalCents: subtotal,
      vatCents: vatTotal,
      totalCents: total,
      costTotalCents: costTotal,
      marginCents: total - costTotal,
      items: { create: itemsData },
    },
  });

  return { orderId: order.id };
}
