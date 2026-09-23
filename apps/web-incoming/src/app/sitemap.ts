import type { MetadataRoute } from 'next';
import { SEITEN, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return SEITEN.map((s) => ({
    url: `${SITE_URL}${s.href === '/' ? '' : s.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: s.href === '/' ? 1 : 0.8,
  }));
}
