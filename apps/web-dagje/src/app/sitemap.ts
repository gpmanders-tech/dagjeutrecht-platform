import type { MetadataRoute } from 'next';
import { prisma } from '@utrecht/db';
import { AUDIENCES } from '../lib/audiences';

const BASE = 'https://dagjeutrecht.nl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/aanbod',
    '/samensteller',
    '/programmas',
    '/cadeau',
    '/blog',
    '/over-ons',
    '/contact',
    '/voorwaarden',
    '/privacy',
    '/bedrijfsuitje-utrecht',
    '/schooluitje-utrecht',
    '/vrijgezellenfeest-utrecht',
    '/teambuilding-utrecht',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const audienceRoutes: MetadataRoute.Sitemap = AUDIENCES.map((a) => ({
    url: `${BASE}/doelgroep/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [providers, programs, posts] = await Promise.all([
      prisma.provider.findMany({
        where: { active: true, category: { notIn: ['WORKSHOP_SERIES', 'GIFTCARD'] as any } },
        select: { slug: true, updatedAt: true },
      }),
      prisma.program.findMany({
        where: { channel: 'DAGJE', published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.blogPost.findMany({
        where: { domain: 'DAGJEUTRECHT', locale: 'nl', published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
    dynamicRoutes = [
      ...providers.map((p) => ({
        url: `${BASE}/aanbod/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...programs.map((p) => ({
        url: `${BASE}/programma/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...posts.map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })),
    ];
  } catch (e) {
    console.error('Sitemap DB fetch failed:', e);
  }

  return [...staticRoutes, ...audienceRoutes, ...dynamicRoutes];
}
