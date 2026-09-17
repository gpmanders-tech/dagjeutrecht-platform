import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/boeken', '/api/', '/inkoop/', '/betaald'],
      },
    ],
    sitemap: 'https://dagjeutrecht.nl/sitemap.xml',
    host: 'https://dagjeutrecht.nl',
  };
}
