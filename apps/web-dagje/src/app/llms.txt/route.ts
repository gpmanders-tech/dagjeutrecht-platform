import { BOUWSTENEN, PAKKETTEN, REGELS, formatEuro, maandenTekst, pakketMaanden, prijsPerPersoon } from '../../lib/aanbod';
import { seoVoorBouwsteen } from '../../lib/bouwsteen-seo';
import { LANDING_LIJST } from '../../lib/landings';

/**
 * llms.txt: een korte, feitelijke samenvatting van de site voor AI-zoekmachines
 * (ChatGPT, Perplexity, Google AI). Alles komt uit aanbod.ts en landings.ts, dus
 * prijzen en pakketten lopen nooit uit de pas met de site.
 */
export const dynamic = 'force-static';
export const revalidate = 86400;

const SITE = 'https://dagjeutrecht.nl';

export function GET() {
  const regels = [
    '# DagjeUtrecht',
    '',
    `> Vaste dagpakketten in Utrecht voor groepen vanaf ${REGELS.minPers} personen: bedrijfsuitjes, personeelsuitjes, teambuilding, schooluitjes en vrijgezellenfeesten. Elk pakket heeft een vaste prijs per persoon, inclusief btw.`,
    '',
    `DagjeUtrecht is een handelsnaam van Handelsonderneming Manders (KvK 63330393), Utrecht. Contact: info@dagjeutrecht.nl, 030 227 14 39.`,
    `Boeken kan voor ${REGELS.minPers} tot ${REGELS.maxPers} personen, op donderdag, vrijdag en zaterdag, minimaal ${REGELS.minDagenVooruit} dagen vooruit. Binnen 3 werkdagen bevestigen de partners alles.`,
    '',
    '## Per gelegenheid',
    '',
    ...LANDING_LIJST.map((l) => `- [${l.link} in Utrecht](${SITE}${l.pad}): ${l.metaOmschrijving}`),
    '',
    '## Pakketten',
    '',
    ...PAKKETTEN.map((p) => {
      const m = pakketMaanden(p);
      return `- [${p.naam}](${SITE}/pakketten/${p.slug}): ${p.kort} ${formatEuro(prijsPerPersoon(p.blokken))} per persoon.${m ? ` Te boeken van ${maandenTekst(m)}.` : ''}`;
    }),
    '',
    '## Activiteiten',
    '',
    ...BOUWSTENEN.map((b) => {
      const titel = seoVoorBouwsteen(b.slug)?.titel ?? b.naam;
      return `- [${titel}](${SITE}/bouwstenen/${b.slug}): ${b.kort} ${formatEuro(b.verkoopCents)} per persoon, ${b.locatie}.`;
    }),
    '',
    '## Meer',
    '',
    `- [Zelf een dag samenstellen](${SITE}/boeken)`,
    `- [Inspiratie en tips](${SITE}/blog)`,
    `- [Over DagjeUtrecht en de partners](${SITE}/over-ons)`,
    `- [Voorwaarden](${SITE}/voorwaarden)`,
    '',
    'Steps of kickbikes los huren gaat via stepverhuurutrecht.nl.',
    '',
  ];
  return new Response(regels.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
