import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  transpilePackages: ['@utrecht/ui', '@utrecht/i18n', '@utrecht/booking-engine', '@utrecht/db'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Oude samensteller en catalogus zijn vervangen door vaste pakketten en bouwstenen
  async redirects() {
    return [
      { source: '/samensteller', destination: '/boeken', permanent: true },
      { source: '/aanvraag', destination: '/boeken', permanent: true },
      { source: '/aanbod', destination: '/bouwstenen', permanent: true },
      { source: '/aanbod/:slug', destination: '/bouwstenen', permanent: true },
      { source: '/programmas', destination: '/pakketten', permanent: true },
      { source: '/programma/:slug', destination: '/pakketten', permanent: true },
      { source: '/doelgroep/teamuitje', destination: '/bedrijfsuitje-utrecht', permanent: true },
      { source: '/doelgroep/schoolgroep', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/doelgroep/vrijgezel', destination: '/vrijgezellenfeest-utrecht', permanent: true },
      { source: '/doelgroep/:slug', destination: '/pakketten', permanent: true },
      { source: '/cadeau', destination: '/', permanent: false },
    ];
  },

  // De site is ook bereikbaar op de vercel.app-adressen van het project. Google
  // vond die kopie en meldt "alternatieve pagina met correcte canonieke tag".
  // De canonical wijst goed, maar het kost crawlbudget, dus zetten we elk
  // vercel.app-adres op noindex. De regex kan alleen op *.vercel.app matchen,
  // nooit op dagjeutrecht.nl.
  async headers() {
    return [
      {
        source: '/:pad*',
        has: [{ type: 'host', value: '.*\.vercel\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },

  // Prisma op Vercel serverless: houd het uit de Next.js-bundle en trace de binaries mee
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
    outputFileTracingRoot: path.join(__dirname, '../..'),
    outputFileTracingIncludes: {
      '/**/*': [
        '../../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/**/*',
        '../../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client/**/*',
      ],
    },
  },
};
