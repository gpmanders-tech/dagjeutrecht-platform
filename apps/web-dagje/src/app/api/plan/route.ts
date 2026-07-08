import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  audience: z.enum(['TEAM', 'STUDENT', 'SCHOOL', 'FAMILY', 'BACHELORETTE']).nullable().optional(),
  season: z
    .enum(['lente', 'zomer', 'herfst', 'winter', 'kerst', 'zomervakantie'])
    .nullable()
    .optional(),
  text: z.string().optional().default(''),
  chips: z.array(z.string()).optional().default([]),
  budgetEuro: z.number().nullable().optional(),
  pax: z.number().int().min(1).max(200).optional().default(10),
});

const SEASON_HINTS: Record<string, string> = {
  lente: 'Lente (mrt-mei) - bloesem, buiten wanneer het kan, terrassen openen',
  zomer: 'Zomer (jun-aug) - buiten, water, avondactiviteiten, terrassen',
  herfst: 'Herfst (sep-nov) - indoor-alternatieven, gezellige eetadressen, kortere daglicht',
  winter: 'Winter (dec-feb) - vooral indoor, opwarmen, borrels, korte middagprogramma\'s',
  kerst: 'Kerst / oud & nieuw (dec) - feestelijk, warme sfeer, chique diner mogelijk',
  zomervakantie:
    'Zomervakantie (jul-aug) - veel gezinnen op pad, drukker in centrum, meer buiten-opties',
};

export async function POST(req: Request) {
  const body = await req.json();
  const { audience, season, text, chips, budgetEuro, pax } = schema.parse(body);

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(await fallbackPlan(audience));
  }

  const providers = await prisma.provider.findMany({
    where: {
      active: true,
      ...(audience ? { audienceTags: { has: audience } } : {}),
    },
    include: { products: { where: { active: true }, take: 1 } },
  });

  const catalog = providers.map((p) => {
    const product = p.products[0];
    const priceCents = product
      ? computePrice({
          costCents: product.costPriceCents,
          tier: 'B2C',
          vatRate: Number(p.vatRate),
          marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
        }).sellPriceCents
      : 0;
    return {
      slug: p.slug,
      name: p.name,
      category: p.category,
      bookable: p.bookable,
      priceCents,
      rating: p.rating,
      groupMax: p.groupMax,
      groupMin: p.groupMin,
      heroImage: p.heroImage,
    };
  });

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const audienceLabel: Record<string, string> = {
    TEAM: 'een teamuitje (bedrijf, ZZP-club of MT)',
    STUDENT: 'een studentenclubje (borrelen, actief, prijs telt)',
    SCHOOL: 'een schoolgroep (leerdoel, veiligheid, factuur op school)',
    FAMILY: 'een gezinsuitje (kindvriendelijk, weersafhankelijk alternatief)',
    BACHELORETTE: 'een vrijgezellenfeest (sfeer, spannend, 8-16 personen)',
  };

  const systemPrompt = `Je bent een enthousiaste Utrechtse stadsgids voor DagjeUtrecht.nl.
Je krijgt een lijst met échte leveranciers en stelt een dagprogramma van 3-5 onderdelen samen
dat past bij ${audience ? audienceLabel[audience] : 'de doelgroep die uit de tekst blijkt'}.
Gebruik UITSLUITEND leveranciers uit de meegegeven lijst.

Return JSON:
{ "intro": "1-2 warme zinnen", "suggestions": [{"providerSlug": "...", "name": "...", "time": "10:00", "reason": "max 1 zin", "durationMinutes": 60}] }

Regels:
- Logische volgorde ochtend -> middag -> avond
- Wandel/fietsafstanden binnen Utrecht-centrum
- Groep van ${pax} personen - respecteer groupMin/groupMax
- ${budgetEuro ? `Budget €${budgetEuro} p.p. - som van prijzen blijft daaronder` : 'Geen budget-limiet'}
- ${chips.length ? `Sfeer: ${chips.join(', ')}` : ''}
- ${season ? `Jaargetijde/thema: ${SEASON_HINTS[season] ?? season}` : ''}
- BELANGRIJK: als de wandeltijd tussen twee opeenvolgende stops meer dan 30 minuten is, ofwel (a) kies dichterbijgelegen alternatieven, ofwel (b) voeg als eerste onderdeel "fietsverhuur-utrecht-cs" toe als vertrekpunt, en gebruik daarna verder-gelegen locaties. Utrecht is klein - meestal is 30 min lopen genoeg. Alleen bij bijv. Kasteel de Haar of Spoorwegmuseum wordt fiets een must.`;

  const userMsg = `Klantvraag:
${text || '(geen extra tekst)'}

Beschikbare leveranciers (slug → naam (categorie) [prijs cents, groepgrenzen]):
${catalog
  .map(
    (c) =>
      `${c.slug} → ${c.name} (${c.category})${c.bookable ? '' : ' [TIP]'} ${c.priceCents}c${
        c.groupMin || c.groupMax ? ` [${c.groupMin ?? '?'}-${c.groupMax ?? '?'}]` : ''
      }${c.rating ? ` ★${c.rating}` : ''}`
  )
  .join('\n')}

Geef alleen het JSON-object terug.`;

  try {
    const resp = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMsg }],
    });
    const raw = resp.content.map((c) => (c.type === 'text' ? c.text : '')).join('');
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Geen JSON in antwoord');
    const parsed = JSON.parse(jsonMatch[0]) as { intro: string; suggestions: any[] };

    const enriched = parsed.suggestions
      .map((s) => {
        const provider = catalog.find((c) => c.slug === s.providerSlug);
        return provider
          ? {
              ...s,
              priceCents: provider.priceCents,
              bookable: provider.bookable,
              heroImage: provider.heroImage,
            }
          : null;
      })
      .filter(Boolean);

    return NextResponse.json({ intro: parsed.intro, suggestions: enriched });
  } catch (e: any) {
    console.error('AI plan failed:', e);
    return NextResponse.json(await fallbackPlan(audience));
  }
}

async function fallbackPlan(audience: string | null | undefined) {
  const top = await prisma.provider.findMany({
    where: {
      active: true,
      bookable: true,
      rating: { gte: 4.3 },
      ...(audience ? { audienceTags: { has: audience as any } } : {}),
    },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: { rating: 'desc' },
    take: 4,
  });
  return {
    intro:
      'AI-key ontbreekt - hier zijn onze best beoordeelde plekken voor deze doelgroep (handmatig gesorteerd):',
    suggestions: top
      .filter((p) => p.products[0])
      .map((p, i) => {
        const product = p.products[0]!;
        const { sellPriceCents } = computePrice({
          costCents: product.costPriceCents,
          tier: 'B2C',
          vatRate: Number(p.vatRate),
          marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
        });
        return {
          providerSlug: p.slug,
          name: p.name,
          reason: `★ ${p.rating} - favoriet in deze categorie.`,
          time: ['10:00', '13:00', '15:30', '19:30'][i] ?? undefined,
          priceCents: sellPriceCents,
          bookable: true,
          heroImage: p.heroImage,
        };
      }),
  };
}
