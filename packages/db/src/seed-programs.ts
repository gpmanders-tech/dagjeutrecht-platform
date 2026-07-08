import { PrismaClient, TargetAudience, EnquiryChannel, Category } from '@prisma/client';

const prisma = new PrismaClient();

type SeedProgram = {
  slug: string;
  channel: EnquiryChannel;
  audienceTags: TargetAudience[];
  title: string;
  subtitle: string;
  description: string;
  durationHours: number;
  defaultPax: number;
  pricePerPerson: number; // in cents
  order: number;
  heroImage?: string;
  items: Array<{ providerSlug: string; time: string; notes?: string }>;
};

const PROGRAMS: SeedProgram[] = [
  // ================= TEAM =================
  {
    slug: 'teamuitje-actief-en-borrel',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.TEAM],
    title: 'Actief team + Utrechtse borrel',
    subtitle: 'Escape · lunch · rondvaart · borrel',
    description:
      'Klassiek teamuitje: begin met een escaperoom of pingpongsessie, dan lunch in de stad, een rondvaart over de gracht, en afsluiten met een lange borrel.',
    durationHours: 8,
    defaultPax: 12,
    pricePerPerson: 8500,
    order: 1,
    items: [
      { providerSlug: 'escape-world', time: '11:00', notes: 'Escaperoom in teams van 4' },
      { providerSlug: 'streetfood-club', time: '13:30', notes: 'Streetfood-lunch' },
      { providerSlug: 'schuttevaer', time: '15:30', notes: 'Klassieke rondvaart' },
      { providerSlug: 'biercafe-olivier', time: '17:30', notes: 'Borrel in een kerkje' },
    ],
  },
  {
    slug: 'teamuitje-culi-utrecht',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.TEAM],
    title: 'Culinair Utrecht voor teams',
    subtitle: 'Food tour · bierproef · diner',
    description:
      'Voor teams die van eten en drinken houden: een uitgebreide food tour door de binnenstad, bierworkshop en avondmaal in een topzaak.',
    durationHours: 7,
    defaultPax: 10,
    pricePerPerson: 9500,
    order: 2,
    items: [
      { providerSlug: 'utrecht-food-tour', time: '12:00' },
      { providerSlug: 'beer-pioneer', time: '15:30' },
      { providerSlug: 'hemel-en-aarde', time: '19:00' },
    ],
  },

  // ================= STUDENT =================
  {
    slug: 'studenten-borrel-en-water',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.STUDENT],
    title: 'SUPpen + kroegentocht',
    subtitle: 'SUP · streetfood · pubcrawl',
    description:
      'Actieve middag op het water, streetfood-lunch en kroegentocht door de studentenkroegen van Utrecht.',
    durationHours: 8,
    defaultPax: 14,
    pricePerPerson: 3900,
    order: 1,
    items: [
      { providerSlug: 'dagjesuppen', time: '13:00' },
      { providerSlug: 'streetfood-club', time: '16:00' },
      { providerSlug: 'biercafe-olivier', time: '19:00', notes: 'Startpunt kroegentocht' },
    ],
  },
  {
    slug: 'studenten-budget-escape-diner',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.STUDENT],
    title: 'Escaperoom + budget diner',
    subtitle: 'Escape · pizza · borrel',
    description:
      'Betaalbaar en toch een echte activiteit: escaperoom in teams, informele pizzeria, en afsluiten met bier op het Ledig Erf.',
    durationHours: 5,
    defaultPax: 12,
    pricePerPerson: 2900,
    order: 2,
    items: [
      { providerSlug: 'escape-world', time: '16:00' },
      { providerSlug: 'streetfood-club', time: '18:30' },
    ],
  },

  // ================= SCHOOL =================
  {
    slug: 'school-utrecht-historie',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.SCHOOL],
    title: 'Utrecht van boven en beneden',
    subtitle: 'Domtoren · DOMunder · rondvaart',
    description:
      'Educatieve dag voor bovenbouw basisschool / onderbouw voortgezet: beklim de Domtoren, tijdreis onder het Domplein en zie de stad vanaf het water.',
    durationHours: 6,
    defaultPax: 30,
    pricePerPerson: 2200,
    order: 1,
    items: [
      { providerSlug: 'domtoren', time: '10:00' },
      { providerSlug: 'domunder', time: '12:30' },
      { providerSlug: 'utrecht-canal-cruises', time: '14:30' },
    ],
  },
  {
    slug: 'school-groep8-afscheid',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.SCHOOL],
    title: 'Groep 8 afscheid — pret én lekker eten',
    subtitle: 'Speelklok · varen · pizza',
    description:
      'Feestelijke afscheidsdag voor groep 8: interactief museum, varen en gezellig pizza-eten. Weer-alternatief inbegrepen.',
    durationHours: 6,
    defaultPax: 30,
    pricePerPerson: 2500,
    order: 2,
    items: [
      { providerSlug: 'museum-speelklok', time: '10:30' },
      { providerSlug: 'kleine-kapitein', time: '13:00' },
      { providerSlug: 'streetfood-club', time: '15:30' },
    ],
  },

  // ================= FAMILY =================
  {
    slug: 'gezin-nijntje-en-water',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.FAMILY],
    title: 'Nijntje-dag',
    subtitle: 'Miffy · Speelklok · kinderboot',
    description:
      'Een dag vol verwondering: van Nijntje tot draaiorgels, met een kindvriendelijke rondvaart tussendoor.',
    durationHours: 6,
    defaultPax: 4,
    pricePerPerson: 4200,
    order: 1,
    items: [
      { providerSlug: 'miffy-museum', time: '10:00' },
      { providerSlug: 'museum-speelklok', time: '12:30' },
      { providerSlug: 'kleine-kapitein', time: '14:30' },
    ],
  },
  {
    slug: 'gezin-actieve-familiedag',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.FAMILY],
    title: 'Actieve familiedag',
    subtitle: 'SUP · pannenkoeken · Spoorwegmuseum',
    description:
      'Voor gezinnen met kinderen vanaf 8: rustige SUP-clinic, pannenkoekenlunch en het spectaculaire Spoorwegmuseum.',
    durationHours: 7,
    defaultPax: 4,
    pricePerPerson: 5500,
    order: 2,
    items: [
      { providerSlug: 'dagjesuppen', time: '10:00' },
      { providerSlug: 'streetfood-club', time: '12:30' },
      { providerSlug: 'spoorwegmuseum', time: '14:30' },
    ],
  },

  // ================= BACHELORETTE =================
  {
    slug: 'vrijgezel-bruid-op-het-water',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.BACHELORETTE],
    title: 'Bruid op het water',
    subtitle: 'SUP · high tea · rondvaart met bubbels',
    description:
      'Een klassieke BJ voor de bruid: SUP-en met de meiden, high tea aan de gracht, en afsluiten met een privé-rondvaart mét bubbels.',
    durationHours: 7,
    defaultPax: 10,
    pricePerPerson: 7500,
    order: 1,
    items: [
      { providerSlug: 'dagjesuppen', time: '11:00' },
      { providerSlug: 'hemel-en-aarde', time: '14:00', notes: 'Bijzondere high tea' },
      { providerSlug: 'schuttevaer', time: '17:00', notes: 'Privé-vaart met bubbels' },
    ],
  },
  {
    slug: 'vrijgezel-bier-en-escape',
    channel: 'DAGJE',
    audienceTags: [TargetAudience.BACHELORETTE],
    title: 'Bier & escape (BA)',
    subtitle: 'Bierworkshop · escape · diner',
    description:
      'Voor de mannelijke variant of stoere bruid-varianten: bierworkshop, escaperoom, streetfood en een goede afsluiting.',
    durationHours: 8,
    defaultPax: 10,
    pricePerPerson: 6500,
    order: 2,
    items: [
      { providerSlug: 'beer-pioneer', time: '13:00' },
      { providerSlug: 'escape-world', time: '16:00' },
      { providerSlug: 'streetfood-club', time: '19:00' },
    ],
  },
];

async function main() {
  console.log(`Seeding ${PROGRAMS.length} programs…`);

  for (const p of PROGRAMS) {
    const providers = await prisma.provider.findMany({
      where: { slug: { in: p.items.map((it) => it.providerSlug) } },
    });
    const bySlug = new Map(providers.map((pr) => [pr.slug, pr]));

    const program = await prisma.program.upsert({
      where: { slug: p.slug },
      update: {
        channel: p.channel,
        audienceTags: p.audienceTags,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        durationHours: p.durationHours,
        defaultPax: p.defaultPax,
        pricePerPerson: p.pricePerPerson,
        heroImage: p.heroImage,
        order: p.order,
        published: true,
      },
      create: {
        slug: p.slug,
        channel: p.channel,
        audienceTags: p.audienceTags,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        durationHours: p.durationHours,
        defaultPax: p.defaultPax,
        pricePerPerson: p.pricePerPerson,
        heroImage: p.heroImage,
        order: p.order,
        published: true,
      },
    });

    // wis en herseed items
    await prisma.programItem.deleteMany({ where: { programId: program.id } });
    await prisma.programItem.createMany({
      data: p.items
        .map((it, i) => {
          const prov = bySlug.get(it.providerSlug);
          if (!prov) {
            console.warn(`  ! ${p.slug}: provider ${it.providerSlug} niet gevonden`);
            return null;
          }
          return {
            programId: program.id,
            providerId: prov.id,
            order: i,
            timeSlot: it.time,
            notes: it.notes ?? null,
          };
        })
        .filter((x): x is Exclude<typeof x, null> => x !== null),
    });

    console.log(`  ✓ ${p.slug}`);
  }

  console.log('Audience-tags updaten op providers (heuristiek per categorie)…');
  const providers = await prisma.provider.findMany();
  for (const p of providers) {
    const tags = audienceTagsForCategory(p.category, p.slug);
    if (tags.length) {
      await prisma.provider.update({
        where: { id: p.id },
        data: { audienceTags: { set: tags } },
      });
    }
  }
  console.log(`  ✓ ${providers.length} providers ge-audience-tagged`);

  console.log('Done.');
}

function audienceTagsForCategory(cat: Category, slug: string): TargetAudience[] {
  const tags: TargetAudience[] = [];
  switch (cat) {
    case 'MUSEUM':
    case 'ATTRACTION':
      tags.push(TargetAudience.TEAM, TargetAudience.SCHOOL, TargetAudience.FAMILY);
      break;
    case 'INDOOR':
    case 'WORKSHOP':
    case 'WORKSHOP_SERIES':
      tags.push(TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.BACHELORETTE);
      break;
    case 'WATER':
      tags.push(TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.FAMILY, TargetAudience.BACHELORETTE);
      break;
    case 'TOUR':
      tags.push(TargetAudience.TEAM, TargetAudience.FAMILY, TargetAudience.SCHOOL);
      break;
    case 'RESTAURANT':
      tags.push(TargetAudience.TEAM, TargetAudience.STUDENT, TargetAudience.FAMILY, TargetAudience.BACHELORETTE);
      break;
    case 'WELLNESS':
      tags.push(TargetAudience.TEAM, TargetAudience.BACHELORETTE);
      break;
    case 'EVENT':
      tags.push(TargetAudience.TEAM, TargetAudience.STUDENT);
      break;
    case 'HOTEL':
      // hotels — geen doelgroep-specifiek, laat leeg
      break;
    case 'SHOP':
    case 'GIFTCARD':
      break;
  }
  // Miffy specifiek gezinnen
  if (slug.includes('miffy') || slug.includes('kleine-kapitein')) {
    if (!tags.includes(TargetAudience.FAMILY)) tags.push(TargetAudience.FAMILY);
    if (!tags.includes(TargetAudience.SCHOOL)) tags.push(TargetAudience.SCHOOL);
  }
  return tags;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
