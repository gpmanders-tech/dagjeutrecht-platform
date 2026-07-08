'use server';

import { prisma } from '@utrecht/db';
import { z } from 'zod';

const schema = z.object({
  orderId: z.string(),
  providerId: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().optional().default(''),
  body: z.string().min(5),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
});

export async function submitReview(input: z.infer<typeof schema>) {
  const data = schema.parse(input);

  await prisma.review.create({
    data: {
      orderId: data.orderId,
      providerId: data.providerId,
      rating: data.rating,
      title: data.title || null,
      body: data.body,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      published: false,
    },
  });

  return { ok: true };
}
