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
      { source: '/aanbod/pannenkoekenboot-utrecht', destination: '/bouwstenen/rondvaart', permanent: false },
      { source: '/aanbod/domstadboot-bbq', destination: '/bouwstenen/bbq', permanent: true },
      { source: '/aanbod/fietsverhuur-utrecht-cs', destination: '/bouwstenen/kickbike-tocht', permanent: true },
      { source: '/aanbod/team-building', destination: '/teambuilding-utrecht', permanent: true },
      { source: '/programmas', destination: '/pakketten', permanent: true },
      { source: '/programma/:slug', destination: '/pakketten', permanent: true },
      // Tijdelijk of blijvend, en waarom dat uitmaakt (keuze Ger 22-9-2026, DAG-SEO-38):
      // een blijvende doorverwijzing (permanent: true, 308) zegt tegen Google dat het oude
      // adres weg is en dat de nieuwe pagina zijn plek overneemt. Dat klopt alleen als die
      // nieuwe pagina echt over hetzelfde gaat. Voor de onderwerpen waar nog een eigen
      // bouwsteen voor komt (pannenkoekenboot, escape en spellen, boulderen en bowlen,
      // kaasproeverij) staat de doorverwijzing daarom op permanent: false (307): het oude
      // adres blijft dan in Google staan tot de echte pagina er is. Zodra die bouwsteen
      // live staat gaat hij op true en verhuist de positie alsnog mee.
      //
      // Keuzes van Ger uit de besliskaart, 22-9-2026. Search Console liet zien dat
      // 71 oude adressen nog vertoningen kregen en een 404 gaven; 62 daarvan stonden
      // nog op pagina 1. Een 404 kost die plek binnen enkele weken. Per onderwerp is
      // gekozen: opnemen in het aanbod, doorverwijzen, of bewust laten vallen.
      // Bij de onderwerpen die opgenomen worden is dit tijdelijk: zolang de bouwsteen
      // er niet is, landt de bezoeker op het onderdeel dat er het dichtst bij ligt.
      // Wat Ger wil laten vallen (webshop, wellness, kinderen) krijgt met opzet geen
      // regel en blijft een 404, zodat Google die adressen loslaat.
      { source: '/aanbod/varen-in-utrecht', destination: '/bouwstenen/rondvaart', permanent: true },
      { source: '/aanbod/kaasproeverij-utrecht', destination: '/bouwstenen/groepslunch', permanent: false },
      { source: '/aanbod/ping-pong-club', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/the-park-vr', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/boulderhal-energiehaven', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/oude-muntkelder', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/utours', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/doloris-anoma-maze', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/black-bikes-utrecht', destination: '/bouwstenen/kickbike-tocht', permanent: true },
      { source: '/aanbod/queen-escape-room', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/keramiek-kafee', destination: '/bouwstenen/city-challenge', permanent: true },
      { source: '/aanbod/vechtsebanen-bowling', destination: '/bouwstenen/shuffleboard', permanent: false },
      { source: '/aanbod/ruby-rose', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/boulderhal-sterk-spoor', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/biercafe-olivier', destination: '/bouwstenen/borrel', permanent: true },
      { source: '/aanbod/kartoffel', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/buiten-bij-de-sluis', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/comedyclub-utrecht', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/padel-utrecht', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/kayak-utrecht', destination: '/bouwstenen/kanoen', permanent: true },
      { source: '/aanbod/landhuis-in-de-stad', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/humphreys', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/clay-to-plate', destination: '/bouwstenen/city-challenge', permanent: true },
      { source: '/aanbod/miffy-museum', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/brouwerij-maximus', destination: '/bouwstenen/borrel', permanent: true },
      { source: '/aanbod/theehuis-rhijnauwen', destination: '/bouwstenen/koffie-met-gebak', permanent: true },
      { source: '/aanbod/water-tower-wt', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/spoorwegmuseum', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/boulderhal-zuidhaven', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/amara', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/grachtenatelier-schilderen', destination: '/bouwstenen/city-challenge', permanent: true },
      { source: '/aanbod/kookfabriek', destination: '/bouwstenen/city-challenge', permanent: true },
      { source: '/aanbod/wax-figures-museum', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/free-walking-tour', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/louis-hartlooper', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/aboriginal-art-museum', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/escape-domplein', destination: '/bouwstenen/city-challenge', permanent: false },
      { source: '/aanbod/utrecht-food-tour', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/silk-road', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/beers-barrels', destination: '/bouwstenen/borrel', permanent: true },
      { source: '/aanbod/broadway-steakhouse', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/carmel-market', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/el-qatarijne', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/grachtenatelier-chocolade', destination: '/bouwstenen/koffie-met-gebak', permanent: true },
      { source: '/aanbod/house-of-clay', destination: '/bouwstenen/city-challenge', permanent: true },
      { source: '/aanbod/oproer-brouwerij', destination: '/bouwstenen/borrel', permanent: true },
      { source: '/aanbod/san-siro', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/trai-vegan', destination: '/bouwstenen/groepslunch', permanent: true },
      { source: '/aanbod/beatrix-theater', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/kasteel-de-haar', destination: '/schooluitje-utrecht', permanent: true },
      { source: '/aanbod/william-street-bike', destination: '/bouwstenen/kickbike-tocht', permanent: true },

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
