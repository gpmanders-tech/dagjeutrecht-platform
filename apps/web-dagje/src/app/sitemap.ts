import type { MetadataRoute } from 'next';
import { prisma } from '@utrecht/db';
import { BOUWSTENEN, PAKKETTEN } from '../lib/aanbod';

const BASE = 'https://dagjeutrecht.nl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vast: MetadataRoute.Sitemap = [
    '',
    '/pakketten',
    '/bouwstenen',
    '/bedrijfsuitje-utrecht',
    '/personeelsuitje-utrecht',
    '/teambuilding-utrecht',
    '/bedrijfsfeest-utrecht',
    '/schooluitje-utrecht',
    '/vrijgezellenfeest-utrecht',
    '/blog',
    '/over-ons',
    '/contact',
    '/voorwaarden',
    '/privacy',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const pakketten: MetadataRoute.Sitemap = PAKKETTEN.map((p) => ({
    url: `${BASE}/pakketten/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const bouwstenen: MetadataRoute.Sitemap = BOUWSTENEN.map((b) => ({
    url: `${BASE}/bouwstenen/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  let blog: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { domain: 'DAGJEUTRECHT', locale: 'nl', published: true },
      select: { slug: true, updatedAt: true },
    });
    blog = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch (e) {
    console.error('Sitemap DB fetch failed:', e);
  }

  return [...vast, ...pakketten, ...bouwstenen, ...blog];
}
