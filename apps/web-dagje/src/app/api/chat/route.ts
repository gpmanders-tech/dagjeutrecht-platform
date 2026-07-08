import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const stateSchema = z
  .object({
    slugs: z.array(z.string()).optional().default([]),
    pax: z.number().int().optional(),
    audience: z.string().nullable().optional(),
    season: z.string().nullable().optional(),
  })
  .optional();

const schema = z.object({
  history: z
    .array(z.object({ role: z.enum(['assistant', 'user']), content: z.string() }))
    .optional()
    .default([]),
  message: z.string().min(1),
  state: stateSchema,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { history, message, state } = schema.parse(body);

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      reply:
        'De AI-gids staat momenteel op vakantie. Gebruik zolang de knop "Plan mijn dag" bovenaan - die werkt ook zonder AI.',
      suggestions: [],
    });
  }

  const providers = await prisma.provider.findMany({
    where: { active: true },
    include: { products: { where: { active: true }, take: 1 } },
  });

  const catalog = providers
    .map((p) => {
      const product = p.products[0];
      if (!product) return null;
      const priceCents = computePrice({
        costCents: product.costPriceCents,
        tier: 'B2C',
        vatRate: Number(p.vatRate),
        marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
      }).sellPriceCents;
      return {
        slug: p.slug,
        name: p.name,
        category: p.category,
        priceCents,
        audienceTags: p.audienceTags,
      };
    })
    .filter((x): x is Exclude<typeof x, null> => x !== null);

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const currentSlugs = state?.slugs ?? [];
  const currentPax = state?.pax;
  const catalogBySlug = new Map(catalog.map((c) => [c.slug, c]));
  const currentProgram = currentSlugs
    .map((s) => catalogBySlug.get(s))
    .filter(Boolean)
    .map((c, i) => `${i + 1}. ${c!.slug} (${c!.name}) - €${(c!.priceCents / 100).toFixed(0)}`);

  const systemPrompt = `Je bent "Utrecht", een enthousiaste Utrechtse stadsgids en gastvrouw voor DagjeUtrecht.nl.
Je helpt bezoekers met een dagje uit in Utrecht.

BELANGRIJKSTE ROL: je kan ACTIVELY het huidige programma van de bezoeker aanpassen. Als de bezoeker vraagt "voeg Domtoren toe" of "haal escaperoom eruit", doe dat dan direct.

Regels:
- Antwoord kort en warm (max 3 zinnen)
- Verwijs UITSLUITEND naar leveranciers uit de catalogus hieronder
- Als je iets adviseert/aanraadt zonder aan te passen: sluit af met een JSON-blok tussen \`<<SUGGESTIONS>>\` en \`<</SUGGESTIONS>>\` met suggesties:
  <<SUGGESTIONS>>[{"providerSlug":"domtoren","name":"Domtoren","priceCents":1400,"reason":"begin met uitzicht"}]<</SUGGESTIONS>>
- Als je het programma DAADWERKELIJK aanpast: sluit af met een JSON-blok tussen \`<<ACTIONS>>\` en \`<</ACTIONS>>\`. Voorbeelden:
  <<ACTIONS>>[{"type":"add","providerSlug":"domtoren","time":"10:00","reason":"start met het uitzicht over Utrecht"}]<</ACTIONS>>
  <<ACTIONS>>[{"type":"remove","providerSlug":"escape-world"}]<</ACTIONS>>
  <<ACTIONS>>[{"type":"setTime","providerSlug":"schuttevaer","time":"15:30"}]<</ACTIONS>>
  <<ACTIONS>>[{"type":"setPax","pax":12}]<</ACTIONS>>
  <<ACTIONS>>[{"type":"clear"}]<</ACTIONS>>
- Geef in de gewone tekst GEEN JSON - die blokken worden door de app verborgen.
- Actions ALLEEN uitvoeren als de gebruiker daar echt om vraagt (voeg toe / haal weg / verander tijd / verander aantal). Bij twijfel: eerst vragen of suggesties geven.

HUIDIG PROGRAMMA van de bezoeker:
${currentProgram.length ? currentProgram.join('\n') : '(nog leeg)'}
${currentPax ? `Aantal personen: ${currentPax}` : ''}

Catalogus (slug → naam (categorie) - prijs cents - doelgroepen):
${catalog
  .slice(0, 120)
  .map(
    (c) =>
      `${c.slug} → ${c.name} (${c.category}) - ${c.priceCents}c - [${c.audienceTags.join(',') || 'algemeen'}]`
  )
  .join('\n')}`;

  try {
    const resp = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 700,
      system: systemPrompt,
      messages: [...history.map((h) => ({ role: h.role, content: h.content })), { role: 'user', content: message }],
    });
    const raw = resp.content.map((c) => (c.type === 'text' ? c.text : '')).join('');

    const suggMatch = raw.match(/<<SUGGESTIONS>>([\s\S]*?)<<\/SUGGESTIONS>>/);
    let suggestions: any[] = [];
    if (suggMatch) {
      try {
        const parsed = JSON.parse(suggMatch[1].trim());
        if (Array.isArray(parsed)) {
          suggestions = parsed
            .map((s) => {
              const p = catalog.find((c) => c.slug === s.providerSlug);
              return p
                ? { providerSlug: p.slug, name: p.name, priceCents: p.priceCents, reason: s.reason }
                : null;
            })
            .filter(Boolean);
        }
      } catch {}
    }

    const actMatch = raw.match(/<<ACTIONS>>([\s\S]*?)<<\/ACTIONS>>/);
    let actions: any[] = [];
    if (actMatch) {
      try {
        const parsed = JSON.parse(actMatch[1].trim());
        if (Array.isArray(parsed)) {
          actions = parsed
            .map((a) => {
              if (a?.type === 'add' && typeof a.providerSlug === 'string') {
                const p = catalog.find((c) => c.slug === a.providerSlug);
                if (!p) return null;
                return {
                  type: 'add',
                  providerSlug: p.slug,
                  name: p.name,
                  priceCents: p.priceCents,
                  time: typeof a.time === 'string' ? a.time : undefined,
                  reason: typeof a.reason === 'string' ? a.reason : undefined,
                };
              }
              if (a?.type === 'remove' && typeof a.providerSlug === 'string') {
                return { type: 'remove', providerSlug: a.providerSlug };
              }
              if (a?.type === 'setTime' && typeof a.providerSlug === 'string' && typeof a.time === 'string') {
                return { type: 'setTime', providerSlug: a.providerSlug, time: a.time };
              }
              if (a?.type === 'setPax' && Number.isInteger(a.pax) && a.pax > 0 && a.pax < 500) {
                return { type: 'setPax', pax: a.pax };
              }
              if (a?.type === 'clear') {
                return { type: 'clear' };
              }
              return null;
            })
            .filter(Boolean);
        }
      } catch {}
    }

    const reply = raw
      .replace(/<<SUGGESTIONS>>[\s\S]*?<<\/SUGGESTIONS>>/g, '')
      .replace(/<<ACTIONS>>[\s\S]*?<<\/ACTIONS>>/g, '')
      .trim();

    return NextResponse.json({ reply, suggestions, actions });
  } catch (e: any) {
    console.error('Chat AI failed:', e);
    return NextResponse.json({
      reply: 'Sorry, ik kon even niet nadenken. Probeer het zo nog eens.',
      suggestions: [],
    });
  }
}
