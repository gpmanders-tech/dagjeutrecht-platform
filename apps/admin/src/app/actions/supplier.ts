'use server';

import { prisma } from '@utrecht/db';
import { revalidatePath } from 'next/cache';

export async function confirmSupplier(formData: FormData) {
  const messageId = formData.get('messageId') as string;
  if (!messageId) return;

  await prisma.supplierMessage.update({
    where: { id: messageId },
    data: { status: 'confirmed', confirmedAt: new Date() },
  });

  // Check if alle items van de order zijn bevestigd → order = FULFILLED
  const msg = await prisma.supplierMessage.findUnique({ where: { id: messageId } });
  if (!msg) return;
  const item = await prisma.orderItem.findUnique({
    where: { id: msg.orderItemId },
    include: { order: { include: { items: true } } },
  });
  if (!item) return;

  const allItemIds = item.order.items.map((i) => i.id);
  const confirmedMsgs = await prisma.supplierMessage.count({
    where: { orderItemId: { in: allItemIds }, status: 'confirmed' },
  });
  if (confirmedMsgs === allItemIds.length) {
    await prisma.order.update({
      where: { id: item.order.id },
      data: { status: 'FULFILLED' },
    });
  }

  revalidatePath(`/orders/${item.order.id}`);
  revalidatePath('/mail-queue');
}
