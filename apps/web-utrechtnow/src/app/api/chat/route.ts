import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() })),
  locale: z.string().default('nl'),
});

const LOCALE_NAME: Record<string, string> = {
  nl: 'Nederlands', en: 'English', de: 'Deutsch', fr: 'Français',
  es: 'Español', it: 'Italiano', pt: 'Português',
};

export async function POST(req: Request) {
  const { messages, locale } = schema.parse(await req.json());

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      reply:
        'AI-chat is nog niet geactiveerd (ANTHROPIC_API_KEY ontbreekt in .env). Bekijk ons aanbod op /aanbod of mail info@utrechtnow.nl.',
    });
  }

  const providers = await prisma.provider.findMany({
    where: { active: true },
    include: { products: { where: { active: true }, take: 1 } },
  });

  const catalog = providers.map((p) => {
    const product = p.products[0];
    const price =
      product
        ? computePrice({
            costCents: product.costPriceCents,
            tier: 'B2C',
            vatRate: Number(p.vatRate),
            marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
          }).sellPriceCents
        : 0;
    return `- ${p.slug} | ${p.name} | ${p.category}${p.bookable ? '' : ' (TIP)'}${price ? ` | €${(price / 100).toFixed(2)}` : ''}${p.rating ? ` | ★${p.rating}` : ''}`;
  }).join('\n');

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const system = `Je bent de digitale concierge van Utrecht Now. Antwoord ALTIJD in ${LOCALE_NAME[locale] ?? 'Nederlands'}.
Je beschikt over deze leveranciersdatabase (slug | naam | categorie | prijs | rating):
${catalog}

Regels:
- Verwijs ALLEEN naar leveranciers uit deze lijst.
- Bij een boeksuggestie noem de slug zodat de gebruiker kan klikken naar /aanbod/<slug>.
- Houd antwoorden kort: 1-3 zinnen + max 3 bullets.
- Noem prijzen alleen als ze >0 zijn (anders zeg: "prijs varieert").
- Bij TIP-providers: geen boeklink, alleen tip.
- Bij vragen die je niet kunt beantwoorden: verwijs naar info@utrechtnow.nl.`;

  try {
    const resp = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });
    const reply = resp.content.map((c) => (c.type === 'text' ? c.text : '')).join('');
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ reply: `Fout: ${e.message}` }, { status: 500 });
  }
}
