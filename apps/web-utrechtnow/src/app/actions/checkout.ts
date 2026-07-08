'use server';

import { prisma } from '@utrecht/db';
import { computePrice, generateOrderCode } from '@utrecht/booking-engine';
import { z } from 'zod';

const draftSchema = z.object({
  providerSlug: z.string(),
  productId: z.string(),
  scheduledAt: z.string(),
  participants: z.number().int().min(1).max(200),
  locale: z.string(),
});

export async function createDraftOrder(input: z.infer<typeof draftSchema>) {
  const data = draftSchema.parse(input);

  const provider = await prisma.provider.findUnique({
    where: { slug: data.providerSlug },
    include: { products: { where: { id: data.productId } } },
  });

  if (!provider || !provider.bookable) {
    return { error: 'Deze leverancier is niet boekbaar.' };
  }
  const product = provider.products[0];
  if (!product) return { error: 'Product niet gevonden.' };

  const vatRate = Number(provider.vatRate);
  const price = computePrice({
    costCents: product.costPriceCents,
    tier: 'B2C',
    vatRate,
    marginOverride: provider.marginOverride ? Number(provider.marginOverride) : null,
  });

  const lineTotal = price.sellPriceCents * data.participants;
  const lineCost = product.costPriceCents * data.participants;
  const lineMargin = lineTotal - lineCost;
  const vatPortion = Math.round((lineTotal * vatRate) / (1 + vatRate));

  const order = await prisma.order.create({
    data: {
      publicCode: generateOrderCode('UN'),
      domain: 'UTRECHTNOW',
      locale: data.locale as any,
      status: 'CART',
      customerEmail: '',
      subtotalCents: lineTotal - vatPortion,
      vatCents: vatPortion,
      totalCents: lineTotal,
      costTotalCents: lineCost,
      marginCents: lineMargin,
      items: {
        create: {
          productId: product.id,
          scheduledAt: new Date(data.scheduledAt),
          participants: data.participants,
          unitCostCents: product.costPriceCents,
          unitPriceCents: price.sellPriceCents,
          vatRate: vatRate,
          lineTotalCents: lineTotal,
          lineCostCents: lineCost,
          lineMarginCents: lineMargin,
          channel: provider.channel,
        },
      },
    },
  });

  return { orderId: order.id };
}
