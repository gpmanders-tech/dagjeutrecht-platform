import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /boeken, /inkoop en /betaald dragen zelf een noindex in de pagina.
        // Die kan Google alleen zien als hij de pagina mag ophalen, dus staan ze
        // hier niet meer op disallow. Alleen /api/ blijft dicht.
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://dagjeutrecht.nl/sitemap.xml',
    host: 'https://dagjeutrecht.nl',
  };
}
