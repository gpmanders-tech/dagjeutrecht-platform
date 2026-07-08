'use server';

import { prisma } from '@utrecht/db';
import { revalidatePath } from 'next/cache';

export async function togglePublish(formData: FormData) {
  const id = formData.get('id') as string;
  const publish = formData.get('publish') === 'yes';
  if (!id) return;
  const review = await prisma.review.update({
    where: { id },
    data: { published: publish },
  });

  // Update provider rating gemiddelde wanneer published
  if (review.providerId) {
    const stats = await prisma.review.aggregate({
      where: { providerId: review.providerId, published: true },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.provider.update({
      where: { id: review.providerId },
      data: {
        rating: stats._avg.rating ? Number(stats._avg.rating.toFixed(2)) : null,
        ratingCount: stats._count,
      },
    });
  }

  revalidatePath('/reviews');
}
