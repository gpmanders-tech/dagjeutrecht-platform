'use server';

import { prisma } from '@utrecht/db';
import { revalidatePath } from 'next/cache';
import { fetchOgImage } from '@/lib/scrape-og';

export async function saveProvider(input: {
  id: string;
  websiteUrl: string;
  heroImage: string;
  bookable: boolean;
  active: boolean;
  rating: number | null;
  modifyDeadlineHours: number;
  canChangeTime: boolean;
  canChangeCount: boolean;
}) {
  try {
    await prisma.provider.update({
      where: { id: input.id },
      data: {
        websiteUrl: input.websiteUrl || null,
        heroImage: input.heroImage || null,
        bookable: input.bookable,
        active: input.active,
        rating: input.rating,
        modifyDeadlineHours: input.modifyDeadlineHours,
        canChangeTime: input.canChangeTime,
        canChangeCount: input.canChangeCount,
      },
    });
    revalidatePath('/providers');
    revalidatePath(`/providers/${input.id}`);
    return { ok: true };
  } catch (e: any) {
    return { error: e.message ?? 'Opslaan mislukt' };
  }
}

export async function rescrapeProvider(id: string, websiteUrl: string) {
  if (!websiteUrl) return { error: 'Eerst een website-URL invullen.' };
  const heroImage = await fetchOgImage(websiteUrl);
  if (heroImage) {
    await prisma.provider.update({
      where: { id },
      data: { heroImage, websiteUrl },
    });
    revalidatePath(`/providers/${id}`);
  }
  return { heroImage };
}
