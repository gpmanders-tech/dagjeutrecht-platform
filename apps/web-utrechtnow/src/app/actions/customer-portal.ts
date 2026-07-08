'use server';

import { prisma } from '@utrecht/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function requestCancellation(formData: FormData) {
  const orderId = formData.get('orderId') as string;
  if (!orderId) return;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: { include: { provider: true } } } } },
  });
  if (!order) return;

  const now = Date.now();
  const withinDeadline = order.items.every((it) => {
    if (!it.scheduledAt) return true;
    const hoursUntil = (it.scheduledAt.getTime() - now) / 3600000;
    return hoursUntil >= it.product.provider.modifyDeadlineHours;
  });

  await prisma.modification.create({
    data: {
      orderId,
      type: 'CANCEL',
      status: withinDeadline ? 'APPROVED' : 'REQUESTED',
      payload: { reason: 'customer-requested', withinDeadline },
      priceDeltaCents: withinDeadline ? -order.totalCents : 0,
    },
  });

  if (withinDeadline) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });
    await prisma.voucher.updateMany({ where: { orderId }, data: { status: 'REVOKED' } });
  }

  revalidatePath(`/mijn-boeking/${order.portalToken}`);
}

const modifySchema = z.object({
  orderItemId: z.string(),
  newScheduledAt: z.string().optional(),
  newParticipants: z.coerce.number().int().min(1).max(200).optional(),
});

export async function requestModification(formData: FormData) {
  const data = modifySchema.parse({
    orderItemId: formData.get('orderItemId'),
    newScheduledAt: formData.get('newScheduledAt') || undefined,
    newParticipants: formData.get('newParticipants') || undefined,
  });

  const item = await prisma.orderItem.findUnique({
    where: { id: data.orderItemId },
    include: { order: true, product: { include: { provider: true } } },
  });
  if (!item) return { error: 'Item niet gevonden.' };

  const provider = item.product.provider;
  const now = Date.now();
  const hoursUntil = item.scheduledAt
    ? (item.scheduledAt.getTime() - now) / 3600000
    : 999;
  const withinDeadline = hoursUntil >= provider.modifyDeadlineHours;

  const wantsTime = !!data.newScheduledAt;
  const wantsQty = data.newParticipants != null && data.newParticipants !== item.participants;
  if (wantsTime && !provider.canChangeTime) {
    return { error: 'Tijd wijzigen wordt niet ondersteund door deze leverancier.' };
  }
  if (wantsQty && !provider.canChangeCount) {
    return { error: 'Aantal wijzigen wordt niet ondersteund door deze leverancier.' };
  }

  let priceDelta = 0;
  if (wantsQty) {
    const newQty = data.newParticipants!;
    priceDelta = (newQty - item.participants) * item.unitPriceCents;
  }

  await prisma.modification.create({
    data: {
      orderId: item.orderId,
      type: wantsQty ? 'QUANTITY_CHANGE' : wantsTime ? 'TIME_CHANGE' : 'CANCEL',
      status: withinDeadline ? 'APPROVED' : 'REQUESTED',
      payload: {
        oldScheduledAt: item.scheduledAt?.toISOString() ?? null,
        newScheduledAt: data.newScheduledAt ?? null,
        oldParticipants: item.participants,
        newParticipants: data.newParticipants ?? item.participants,
      },
      priceDeltaCents: withinDeadline ? priceDelta : 0,
    },
  });

  if (withinDeadline) {
    await prisma.orderItem.update({
      where: { id: item.id },
      data: {
        scheduledAt: data.newScheduledAt ? new Date(data.newScheduledAt) : item.scheduledAt,
        participants: data.newParticipants ?? item.participants,
      },
    });
    if (wantsQty) {
      await prisma.voucher.updateMany({
        where: { orderItemId: item.id },
        data: { status: 'REISSUED' },
      });
    }
  }

  revalidatePath(`/mijn-boeking/${item.order.portalToken}`);
  return { ok: true };
}
