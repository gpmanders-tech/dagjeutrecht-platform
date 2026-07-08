'use server';

import { prisma } from '@utrecht/db';
import { revalidatePath } from 'next/cache';

export async function approvePartner(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  await prisma.partner.update({
    where: { id },
    data: { status: 'APPROVED', approvedAt: new Date() },
  });
  revalidatePath('/partners');
}

export async function rejectPartner(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  await prisma.partner.update({
    where: { id },
    data: { status: 'REJECTED' },
  });
  revalidatePath('/partners');
}
