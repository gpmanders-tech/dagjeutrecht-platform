/**
 * Uitbreidingsronde 2026-07: extra Utrechtse leveranciers die missen.
 * Upsert op slug — herhaaldelijk draaien is veilig.
 *
 * Run: pnpm --filter @utrecht/db seed:additions
 */
import { PrismaClient, Category, BookingChannel, FulfilmentType, TargetAudience } from '@prisma/client';

const prisma = new PrismaClient();

const D = BookingChannel.DIRECT;
const TF = BookingChannel.THEFORK;
const BK = BookingChannel.BOOKING;
const V09 = 0.09;
const V21 = 0.21;

type Row = {
  slug: string;
  name: string;
  category: Category;
  channel?: BookingChannel;
  priceCents?: number;
  vatRate?: number;
  websiteUrl?: string;
  audienceTags?: TargetAudience[];
  groupMin?: number;
  groupMax?: number;
  guideLanguages?: string[];
  bookable?: boolean;
  rating?: number;
  fulfilment?: FulfilmentType;
  descriptionNL?: string;
  maxParticipants?: number;
  durationMinutes?: number;
};

const ADDITIONS: Row[] = [
  // === Fietsverhuur bij station ===
  {
    slug: 'fietsverhuur-utrecht-cs',
    name: 'Fietsverhuur Utrecht Centraal',
    category: Category.TOUR,
    channel: D,
    priceCents: 1200,
    vatRate: V21,
    websiteUrl: 'https://www.rijwielshop-utrecht.nl',
    audienceTags: [
      TargetAudience.TEAM,
      TargetAudience.STUDENT,
      TargetAudience.FAMILY,
      TargetAudience.BACHELORETTE,
      TargetAudience.INCOMING_DE,
      TargetAudience.INCOMING_EN,
    ],
    groupMax: 40,
    durationMinutes: 480,
    descriptionNL:
      'Fietsverhuur pal naast Utrecht Centraal Station - ideaal om afstanden tussen activiteiten snel te overbruggen. Gewone fiets, e-bike of bakfiets. Aanraden bij programma\'s met stops meer dan 30 min lopen uit elkaar.',
  },

  // === Water (aanvulling) ===
  {
    slug: 'kanohuren-utrecht',
    name: 'KanoHuren.nl',
    category: Category.WATER,
    channel: BookingChannel.FAREHARBOR,
    priceCents: 1950,
    vatRate: V09,
    websiteUrl: 'https://www.kanohuren.nl',
    audienceTags: [
      TargetAudience.FAMILY,
      TargetAudience.STUDENT,
      TargetAudience.TEAM,
      TargetAudience.BACHELORETTE,
    ],
    groupMax: 40,
    durationMinutes: 90,
    descriptionNL:
      'Kanotocht van 1,5 uur over de Utrechtse grachten. Inclusief kano, peddels en zwemvest. Geschikt voor gezinnen en groepen, ervaring niet nodig.',
  },

  // === Pannenkoeken ===
  {
    slug: 'oude-muntkelder',
    name: 'De Oude Muntkelder',
    category: Category.RESTAURANT,
    channel: D,
    priceCents: 950,
    vatRate: V09,
    websiteUrl: 'https://www.deoudemuntkelder.nl',
    audienceTags: [TargetAudience.FAMILY, TargetAudience.SCHOOL, TargetAudience.TEAM],
    groupMax: 120,
    descriptionNL: 'Klassieke pannenkoekenrestaurant in historische wijnkelder aan de Oudegracht.',
  },
  {
    slug: 'pannenkoekenboot-utrecht',
    name: 'Pannenkoekenboot Utrecht',
    category: Category.WATER,
    channel: D,
    priceCents: 2150,
    vatRate: V09,
    websiteUrl: 'https://www.pannenkoekenboot.nl/utrecht',
    audienceTags: [TargetAudience.FAMILY, TargetAudience.SCHOOL],
    groupMax: 100,
    durationMinutes: 75,
    descriptionNL: 'Onbeperkt pannenkoeken eten tijdens een rondvaart door Utrecht — favoriet bij kinderfeestjes.',
  },
  {
    slug: 'pancakes-utrecht',
    name: 'Pancakes Utrecht',
    category: Category.RESTAURANT,
    channel: D,
    priceCents: 1150,
    vatRate: V09,
    websiteUrl: 'https://pancakesutrecht.nl',
    audienceTags: [TargetAudience.FAMILY, TargetAudience.STUDENT],
    descriptionNL: 'Verse Nederlandse pannenkoeken aan de Vismarkt, ook glutenvrije en vegan varianten.',
  },

  // === Bierbrouwerijen (vervangt broken beer-pioneer) ===
  {
    slug: 'brouwerij-maximus',
    name: 'Brouwerij Maximus',
    category: Category.WORKSHOP,
    channel: D,
    priceCents: 2500,
    vatRate: V21,
    websiteUrl: 'https://www.brouwerijmaximus.nl',
    audienceTags: [TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.BACHELORETTE],
    groupMin: 8,
    groupMax: 40,
    durationMinutes: 120,
    descriptionNL: 'Bierproeverij + rondleiding in de brouwerij van Utrecht — populair voor teamuitjes en vrijgezellenfeesten.',
  },
  {
    slug: 'de-leckere',
    name: 'De Leckere',
    category: Category.WORKSHOP,
    channel: D,
    priceCents: 2200,
    vatRate: V21,
    websiteUrl: 'https://www.deleckere.nl',
    audienceTags: [TargetAudience.TEAM, TargetAudience.STUDENT],
    groupMin: 6,
    groupMax: 30,
    durationMinutes: 90,
    descriptionNL: 'Bierbrouwerij De Leckere in Utrecht — proeverij op eigen locatie.',
  },
  {
    slug: 'oproer-brouwerij',
    name: 'Oproer Brouwerij & Kantine',
    category: Category.RESTAURANT,
    channel: D,
    priceCents: 1800,
    vatRate: V09,
    websiteUrl: 'https://oproerbrouwerij.nl',
    audienceTags: [TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.BACHELORETTE],
    groupMax: 150,
    descriptionNL: 'Craft beer bar + kantine in Werkspoorkathedraal met eigen brouwerij.',
  },

  // === Bowling / kegelen ===
  {
    slug: 'vechtsebanen-bowling',
    name: 'Vechtsebanen Bowling',
    category: Category.INDOOR,
    channel: D,
    priceCents: 1500,
    vatRate: V21,
    websiteUrl: 'https://www.vechtsebanen.nl',
    audienceTags: [
      TargetAudience.TEAM,
      TargetAudience.STUDENT,
      TargetAudience.SCHOOL,
      TargetAudience.FAMILY,
      TargetAudience.BACHELORETTE,
    ],
    groupMax: 80,
    durationMinutes: 90,
    descriptionNL: 'Grootste bowlingcentrum van Utrecht met 20 banen — combineer met borrel.',
  },

  // === Padel ===
  {
    slug: 'padel-utrecht',
    name: 'Padel Utrecht',
    category: Category.INDOOR,
    channel: D,
    priceCents: 1200,
    vatRate: V21,
    websiteUrl: 'https://padelutrecht.nl',
    audienceTags: [TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.BACHELORETTE],
    groupMin: 4,
    groupMax: 24,
    durationMinutes: 60,
    descriptionNL: 'Padelbanen inclusief instructie voor beginners — geschikt voor teambuilding.',
  },

  // === VR / gaming ===
  {
    slug: 'the-park-vr',
    name: 'The Park VR Playground',
    category: Category.INDOOR,
    channel: D,
    priceCents: 3500,
    vatRate: V21,
    websiteUrl: 'https://www.thepark.nl/utrecht',
    audienceTags: [
      TargetAudience.TEAM,
      TargetAudience.STUDENT,
      TargetAudience.BACHELORETTE,
      TargetAudience.SCHOOL,
    ],
    groupMax: 30,
    durationMinutes: 60,
    descriptionNL: 'Free-roaming VR arcade — spellen als Beat Saber en escape-ervaringen in virtual reality.',
  },

  // === Escape / puzzelspellen extra ===
  {
    slug: 'escape-domplein',
    name: 'The Escape Domplein',
    category: Category.INDOOR,
    channel: D,
    priceCents: 2900,
    vatRate: V21,
    websiteUrl: 'https://theescape.nl/utrecht',
    audienceTags: [TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.BACHELORETTE],
    groupMin: 3,
    groupMax: 8,
    durationMinutes: 75,
    descriptionNL: 'Escaperoom pal onder het Domplein — perfect voor kleine teams.',
  },

  // === Kids / familie ===
  {
    slug: 'ballorig-utrecht',
    name: 'Ballorig Utrecht',
    category: Category.INDOOR,
    channel: D,
    priceCents: 950,
    vatRate: V09,
    websiteUrl: 'https://www.ballorig.nl/utrecht',
    audienceTags: [TargetAudience.FAMILY, TargetAudience.SCHOOL],
    groupMax: 200,
    descriptionNL: 'Overdekte indoor-speeltuin voor kinderen t/m 12 jaar.',
  },
  {
    slug: 'monkey-town-utrecht',
    name: 'Monkey Town Utrecht',
    category: Category.INDOOR,
    channel: D,
    priceCents: 1050,
    vatRate: V09,
    websiteUrl: 'https://www.monkeytown.eu/utrecht',
    audienceTags: [TargetAudience.FAMILY],
    groupMax: 100,
    descriptionNL: 'Groot indoor speelparadijs met klimtoestellen, glijbanen en trampolines.',
  },

  // === Museum-extra ===
  {
    slug: 'aboriginal-art-museum',
    name: 'Aboriginal Art Museum (AAMU legacy) — Museum voor Volkenkunde',
    category: Category.MUSEUM,
    channel: D,
    priceCents: 1000,
    vatRate: V09,
    websiteUrl: 'https://www.volkenkunde.nl',
    audienceTags: [TargetAudience.TEAM, TargetAudience.FAMILY],
    bookable: false,
    descriptionNL: 'Niche museum met wisselende volkenkundige exposities — combineer met wandeling.',
  },
  {
    slug: 'universiteitsmuseum',
    name: 'Universiteitsmuseum Utrecht',
    category: Category.MUSEUM,
    channel: D,
    priceCents: 1200,
    vatRate: V09,
    websiteUrl: 'https://www.universiteitsmuseum.nl',
    audienceTags: [TargetAudience.SCHOOL, TargetAudience.FAMILY, TargetAudience.TEAM],
    descriptionNL: 'Wetenschapsmuseum met botanische tuin — populair bij scholen en gezinnen.',
  },

  // === Foodie extra ===
  {
    slug: 'kaasproeverij-utrecht',
    name: 'Kaas & Wijn proeverij Utrecht',
    category: Category.WORKSHOP,
    channel: D,
    priceCents: 3800,
    vatRate: V21,
    websiteUrl: 'https://www.kaas-en-wijn.nl',
    audienceTags: [TargetAudience.TEAM, TargetAudience.BACHELORETTE],
    groupMin: 8,
    groupMax: 30,
    durationMinutes: 120,
    descriptionNL: 'Begeleide kaas- en wijnproeverij op locatie of bij een partnerlocatie in Utrecht.',
  },
  {
    slug: 'high-tea-domtoren',
    name: 'High tea aan de Domtoren',
    category: Category.RESTAURANT,
    channel: D,
    priceCents: 3500,
    vatRate: V09,
    audienceTags: [TargetAudience.FAMILY, TargetAudience.BACHELORETTE, TargetAudience.TEAM],
    groupMin: 4,
    groupMax: 25,
    durationMinutes: 90,
    descriptionNL: 'Klassieke high tea in een van de historische panden rond het Domplein.',
  },

  // === Comedy / theater ===
  {
    slug: 'comedyclub-utrecht',
    name: 'Comedy Club Utrecht (Neude Comedy)',
    category: Category.EVENT,
    channel: D,
    priceCents: 1750,
    vatRate: V09,
    websiteUrl: 'https://neudecomedy.nl',
    audienceTags: [TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.BACHELORETTE],
    groupMax: 60,
    durationMinutes: 120,
    descriptionNL: 'Stand-up avondvoorstelling — vaak in het Nederlands, soms in het Engels.',
  },

  // === Fietsen extra ===
  {
    slug: 'black-bikes-utrecht',
    name: 'Black Bikes Utrecht',
    category: Category.TOUR,
    channel: D,
    priceCents: 1100,
    vatRate: V21,
    websiteUrl: 'https://black.bike/utrecht',
    audienceTags: [TargetAudience.TEAM, TargetAudience.FAMILY, TargetAudience.INCOMING_DE, TargetAudience.INCOMING_EN],
    groupMax: 40,
    descriptionNL: 'Fietsverhuur op meerdere locaties in Utrecht — ook e-bike en bakfiets.',
  },
];

async function main() {
  console.log(`Upsert ${ADDITIONS.length} extra providers…\n`);

  let created = 0;
  let updated = 0;

  for (const p of ADDITIONS) {
    const existed = await prisma.provider.findUnique({ where: { slug: p.slug } });

    const data = {
      name: p.name,
      category: p.category,
      channel: p.channel ?? D,
      bookable: p.bookable ?? true,
      vatRate: p.vatRate ?? 0.21,
      websiteUrl: p.websiteUrl,
      audienceTags: p.audienceTags ?? [],
      groupMin: p.groupMin,
      groupMax: p.groupMax,
      guideLanguages: p.guideLanguages ?? [],
      rating: p.rating,
    };

    const provider = await prisma.provider.upsert({
      where: { slug: p.slug },
      update: data,
      create: { slug: p.slug, ...data },
    });

    if (p.priceCents !== undefined && p.bookable !== false) {
      await prisma.product.upsert({
        where: { providerId_slug: { providerId: provider.id, slug: 'default' } },
        update: {
          costPriceCents: p.priceCents,
          fulfilment: p.fulfilment ?? FulfilmentType.ACTIVITY,
          maxParticipants: p.maxParticipants ?? p.groupMax,
          durationMinutes: p.durationMinutes,
        },
        create: {
          providerId: provider.id,
          slug: 'default',
          fulfilment: p.fulfilment ?? FulfilmentType.ACTIVITY,
          costPriceCents: p.priceCents,
          maxParticipants: p.maxParticipants ?? p.groupMax,
          durationMinutes: p.durationMinutes,
          translations: {
            create: [
              {
                locale: 'nl',
                name: p.name,
                description: p.descriptionNL ?? `Standaard ticket voor ${p.name}.`,
              },
            ],
          },
        },
      });
    }

    if (existed) {
      console.log(`  ✓ ${p.slug} (bijgewerkt)`);
      updated++;
    } else {
      console.log(`  + ${p.slug} (nieuw)`);
      created++;
    }
  }

  // Deactiveer beer-pioneer (Ger meldde: kapot)
  await prisma.provider
    .update({ where: { slug: 'beer-pioneer' }, data: { active: false, bookable: false } })
    .then(() => console.log('  - beer-pioneer → inactive (kapotte URL, vervangen door brouwerij-maximus/de-leckere)'))
    .catch(() => {});

  console.log(`\nDone. ${created} nieuw · ${updated} bijgewerkt.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
