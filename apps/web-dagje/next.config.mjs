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

      // Oude cataloguspagina's die een echte opvolger hebben, gaan daar per stuk
      // naartoe. Alles naar /bouwstenen sturen leek netjes, maar Google ziet een
      // permanente doorverwijzing naar een algemene pagina als een verdwenen
      // pagina (soft 404) en draagt de positie dan niet over. De rest van de oude
      // /aanbod-pagina's zijn leveranciers die we niet meer verkopen; die geven
      // voortaan gewoon een 404, want dat is eerlijker dan doorsturen naar iets
      // anders.
      { source: '/aanbod/suppen-kromme-rijn', destination: '/bouwstenen/suppen', permanent: true },
      { source: '/aanbod/sup-sup-club', destination: '/bouwstenen/suppen', permanent: true },
      { source: '/aanbod/sup-en-kanoverhuur', destination: '/bouwstenen/suppen', permanent: true },
      { source: '/aanbod/dagjesuppen', destination: '/bouwstenen/suppen', permanent: true },
      { source: '/aanbod/kanohuren-utrecht', destination: '/bouwstenen/kanoen', permanent: true },
      { source: '/aanbod/jeu-de-boules-bar', destination: '/bouwstenen/jeu-de-boules', permanent: true },
      { source: '/aanbod/boules-club-oudegracht', destination: '/bouwstenen/jeu-de-boules', permanent: true },
      { source: '/aanbod/mooie-boules', destination: '/bouwstenen/jeu-de-boules', permanent: true },
      { source: '/aanbod/grand-shuffle', destination: '/bouwstenen/shuffleboard', permanent: true },
      { source: '/aanbod/domtoren', destination: '/bouwstenen/domtoren', permanent: true },
      { source: '/aanbod/high-tea-domtoren', destination: '/bouwstenen/domtoren', permanent: true },
      { source: '/aanbod/canal-cruising', destination: '/bouwstenen/rondvaart', permanent: true },
      { source: '/aanbod/utrecht-canal-cruises', destination: '/bouwstenen/rondvaart', permanent: true },
      { source: '/aanbod/stromma-peddelboot', destination: '/bouwstenen/rondvaart', permanent: true },
      { source: '/aanbod/pannenkoekenboot-utrecht', destination: '/bouwstenen/rondvaart', permanent: true },
      { source: '/aanbod/domstadboot-bbq', destination: '/bouwstenen/bbq', permanent: true },
      { source: '/aanbod/fietsverhuur-utrecht-cs', destination: '/bouwstenen/kickbike-tocht', permanent: true },
      { source: '/aanbod/team-building', destination: '/teambuilding-utrecht', permanent: true },
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
