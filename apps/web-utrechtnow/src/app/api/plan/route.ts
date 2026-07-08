import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  text: z.string().optional().default(''),
  chips: z.array(z.string()).optional().default([]),
  budgetEuro: z.number().nullable().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { text, chips, budgetEuro } = schema.parse(body);

  if (!process.env.ANTHROPIC_API_KEY) {
    // Fallback zonder AI: simpele heuristiek
    return NextResponse.json(await fallbackPlan(text, chips));
  }

  // Haal beschikbare providers op (ook TIPs voor sfeer-suggesties)
  const providers = await prisma.provider.findMany({
    where: { active: true },
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
      maxParticipants: product?.maxParticipants,
      heroImage: p.heroImage,
    };
  });

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const systemPrompt = `Je bent een ervaren Utrechtse stadsgids voor het platform Utrecht Now.
Je krijgt een lijst van échte boekbare leveranciers en moet een persoonlijk dagprogramma samenstellen van 3-5 onderdelen
die qua tijd, locatie en sfeer op elkaar aansluiten. Gebruik UITSLUITEND leveranciers uit de meegegeven lijst.
Geef terug in JSON met velden:
{ "intro": "1-2 zinnen warme intro", "suggestions": [{"providerSlug": "...", "name": "...", "time": "10:00", "reason": "max 1 zin"}] }

Houd rekening met:
- Logische volgorde (ochtend → middag → avond)
- Wandelafstanden binnen Utrecht-centrum
- ${budgetEuro ? `Budget van €${budgetEuro} p.p. — som van prijzen blijft daar onder` : 'Geen specifiek budget'}
- ${chips.length ? `Sfeer-voorkeuren: ${chips.join(', ')}` : ''}`;

  const userMsg = `Wat de klant wil:
${text || '(geen vrije tekst)'}

Beschikbare leveranciers (slug → naam (categorie) — prijs in cents, rating):
${catalog.map((c) => `${c.slug} → ${c.name} (${c.category})${c.bookable ? '' : ' [TIP/niet boekbaar]'}${c.priceCents ? ` — ${c.priceCents}c` : ''}${c.rating ? ` ★${c.rating}` : ''}`).join('\n')}

Geef alleen het JSON-object terug, geen extra tekst.`;

  try {
    const resp = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMsg }],
    });
    const raw = resp.content
      .map((c) => (c.type === 'text' ? c.text : ''))
      .join('');
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Geen JSON in antwoord');
    const parsed = JSON.parse(jsonMatch[0]) as { intro: string; suggestions: any[] };

    const enriched = parsed.suggestions
      .map((s) => {
        const provider = catalog.find((c) => c.slug === s.providerSlug);
        return provider
          ? { ...s, priceCents: provider.priceCents, bookable: provider.bookable, heroImage: provider.heroImage }
          : null;
      })
      .filter(Boolean);

    return NextResponse.json({ intro: parsed.intro, suggestions: enriched });
  } catch (e: any) {
    console.error('AI plan failed:', e);
    return NextResponse.json(await fallbackPlan(text, chips));
  }
}

async function fallbackPlan(text: string, chips: string[]) {
  // Eenvoudige fallback: top-3 op rating, 1 hotel, 1 restaurant tip
  const top = await prisma.provider.findMany({
    where: { active: true, bookable: true, rating: { gte: 4.5 } },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: { rating: 'desc' },
    take: 4,
  });
  return {
    intro: 'AI-key ontbreekt — hier zijn onze best beoordeelde plekken (handmatige sorteer):',
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
          reason: `★ ${p.rating} — populair in deze categorie.`,
          time: ['10:00', '13:00', '15:30', '19:30'][i] ?? undefined,
          priceCents: sellPriceCents,
          bookable: true,
          heroImage: p.heroImage,
        };
      }),
  };
}
