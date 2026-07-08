'use server';

import { prisma } from '@utrecht/db';
import { revalidatePath } from 'next/cache';

export async function updateStatus(fd: FormData) {
  const id = String(fd.get('id') || '');
  const status = String(fd.get('status') || 'NEW') as
    | 'NEW'
    | 'IN_PROGRESS'
    | 'QUOTED'
    | 'WON'
    | 'LOST';
  if (!id) return;
  await prisma.enquiry.update({ where: { id }, data: { status } });
  revalidatePath(`/enquiries/${id}`);
  revalidatePath('/enquiries');
}

export async function addNote(fd: FormData) {
  const id = String(fd.get('id') || '');
  const body = String(fd.get('body') || '').trim();
  if (!id || !body) return;
  await prisma.enquiryNote.create({
    data: { enquiryId: id, body, author: 'Ger' },
  });
  revalidatePath(`/enquiries/${id}`);
}
