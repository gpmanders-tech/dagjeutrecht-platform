'use server';

import { prisma } from '@utrecht/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().optional().default(''),
  body: z.string().min(1),
  heroImage: z.string().optional().default(''),
  domain: z.enum(['UTRECHTNOW', 'DAGJEUTRECHT', 'NACHTJEUTRECHT', 'UTRECHTINCOMING']),
  locale: z.enum(['nl', 'en', 'de', 'fr', 'es', 'it', 'pt']),
  published: z.boolean(),
  metaTitle: z.string().optional().default(''),
  metaDesc: z.string().optional().default(''),
});

export async function saveBlogPost(input: z.infer<typeof schema>) {
  try {
    const data = schema.parse(input);
    const payload = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || null,
      body: data.body,
      heroImage: data.heroImage || null,
      domain: data.domain,
      locale: data.locale,
      published: data.published,
      publishedAt: data.published ? new Date() : null,
      metaTitle: data.metaTitle || null,
      metaDesc: data.metaDesc || null,
    };
    if (data.id) {
      await prisma.blogPost.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.blogPost.create({ data: payload });
    }
    revalidatePath('/content');
    return { ok: true };
  } catch (e: any) {
    return { error: e.message ?? 'Opslaan mislukt' };
  }
}

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional().default(''),
  domain: z.enum(['UTRECHTNOW', 'DAGJEUTRECHT', 'NACHTJEUTRECHT', 'UTRECHTINCOMING']),
  locale: z.enum(['nl', 'en', 'de', 'fr', 'es', 'it', 'pt']),
  position: z.coerce.number().int().default(0),
});

export async function saveFaq(input: z.infer<typeof faqSchema>) {
  try {
    const data = faqSchema.parse(input);
    await prisma.faqItem.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category || null,
        domain: data.domain,
        locale: data.locale,
        position: data.position,
      },
    });
    revalidatePath('/content');
    return { ok: true };
  } catch (e: any) {
    return { error: e.message ?? 'Opslaan mislukt' };
  }
}
