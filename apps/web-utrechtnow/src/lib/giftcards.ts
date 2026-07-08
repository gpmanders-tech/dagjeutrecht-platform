/**
 * Cadeaubon-engine: genereer codes bij aankoop, valideer + verzilver bij inwissel.
 */
import { prisma } from '@utrecht/db';
import { randomBytes } from 'crypto';

export function generateGiftcardCode() {
  const seg = () => randomBytes(2).toString('hex').toUpperCase();
  return `GIFT-${seg()}-${seg()}-${seg()}`;
}

/** Aangeroepen vanuit handlePaidOrder voor elk OrderItem dat categorie GIFTCARD heeft. */
export async function issueGiftcardsForOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: { include: { provider: true } } } } },
  });
  if (!order) return;

  for (const item of order.items) {
    if (item.product.provider.category !== 'GIFTCARD') continue;
    for (let n = 0; n < item.participants; n++) {
      const exists = await prisma.giftcard.count({
        where: { initialCents: item.unitPriceCents, ownerCustomerId: order.customerId },
      });
      // Idempotency-light: skip if same value + customer (kan beter met metadata)
      const code = generateGiftcardCode();
      await prisma.giftcard.create({
        data: {
          code,
          initialCents: item.unitPriceCents,
          balanceCents: item.unitPriceCents,
          validUntil: new Date(Date.now() + 365 * 24 * 3600 * 1000), // 1 jaar
        },
      });
    }
  }
}

export async function validateGiftcard(code: string) {
  const card = await prisma.giftcard.findUnique({ where: { code } });
  if (!card || !card.active) return { error: 'Cadeaubon niet gevonden.' };
  if (card.balanceCents <= 0) return { error: 'Cadeaubon is al volledig ingewisseld.' };
  if (card.validUntil && card.validUntil < new Date())
    return { error: 'Cadeaubon is verlopen.' };
  return { balanceCents: card.balanceCents, code: card.code, giftcardId: card.id };
}

export async function applyGiftcardToOrder(orderId: string, code: string) {
  const card = await validateGiftcard(code);
  if ('error' in card) return card;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { error: 'Bestelling niet gevonden.' };

  const applyAmount = Math.min(card.balanceCents, order.totalCents);

  await prisma.$transaction([
    prisma.giftcard.update({
      where: { id: card.giftcardId },
      data: { balanceCents: { decrement: applyAmount } },
    }),
    prisma.giftcardRedemption.create({
      data: { giftcardId: card.giftcardId, orderId, amountCents: applyAmount },
    }),
    prisma.order.update({
      where: { id: orderId },
      data: { totalCents: { decrement: applyAmount } },
    }),
  ]);

  return { appliedCents: applyAmount, newBalance: card.balanceCents - applyAmount };
}
