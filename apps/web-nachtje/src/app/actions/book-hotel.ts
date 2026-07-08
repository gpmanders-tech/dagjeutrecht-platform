'use server';

import { prisma } from '@utrecht/db';
import { computePrice, generateOrderCode } from '@utrecht/booking-engine';
import { z } from 'zod';

const schema = z.object({
  hotelSlug: z.string(),
  productId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().int().min(1).max(10),
  nights: z.number().int().min(1).max(60),
});

export async function bookHotelStay(input: z.infer<typeof schema>) {
  const data = schema.parse(input);

  const provider = await prisma.provider.findUnique({
    where: { slug: data.hotelSlug },
    include: { products: { where: { id: data.productId } } },
  });
  if (!provider || provider.category !== 'HOTEL') return { error: 'Hotel niet gevonden.' };
  const product = provider.products[0];
  if (!product) return { error: 'Kamer niet beschikbaar.' };

  const vatRate = Number(provider.vatRate);
  const price = computePrice({
    costCents: product.costPriceCents,
    tier: 'B2C',
    vatRate,
    marginOverride: provider.marginOverride ? Number(provider.marginOverride) : null,
  });
  const total = price.sellPriceCents * data.nights;
  const cost = product.costPriceCents * data.nights;
  const lineVat = Math.round((total * vatRate) / (1 + vatRate));

  const order = await prisma.order.create({
    data: {
      publicCode: generateOrderCode('NU'),
      domain: 'NACHTJEUTRECHT',
      locale: 'nl',
      status: 'CART',
      customerEmail: '',
      subtotalCents: total - lineVat,
      vatCents: lineVat,
      totalCents: total,
      costTotalCents: cost,
      marginCents: total - cost,
      items: {
        create: {
          productId: product.id,
          scheduledAt: new Date(`${data.checkIn}T15:00`),
          participants: data.guests,
          unitCostCents: product.costPriceCents,
          unitPriceCents: price.sellPriceCents,
          vatRate,
          lineTotalCents: total,
          lineCostCents: cost,
          lineMarginCents: total - cost,
          channel: provider.channel,
          metadata: { checkIn: data.checkIn, checkOut: data.checkOut, nights: data.nights },
        },
      },
    },
  });

  return { orderId: order.id };
}
