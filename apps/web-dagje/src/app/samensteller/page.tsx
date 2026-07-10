import type { Metadata } from 'next';
import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { Samensteller, type InitialSuggestion } from '../../components/samensteller';
import type { AudienceSlug } from '../../lib/audiences';
import { providerImage } from '../../lib/provider-image';
import { Breadcrumbs } from '../../components/seo-jsonld';

export const metadata: Metadata = {
  title: 'Stel je eigen dag Utrecht samen - met AI-hulp',
  description:
    'Onze AI-gids stelt in seconden een dagprogramma voor uit 150+ getoetste Utrechtse leveranciers. Kies doelgroep, budget en sfeer.',
  alternates: { canonical: 'https://dagjeutrecht.nl/samensteller' },
};

export default async function SamenstellerPage({
  searchParams,
}: {
  searchParams: { doelgroep?: string; add?: string };
}) {
  const initialAudience = ['teamuitje', 'studenten', 'schoolgroep', 'gezin', 'vrijgezel'].includes(
    searchParams.doelgroep ?? ''
  )
    ? (searchParams.doelgroep as AudienceSlug)
    : undefined;

  const addSlugs = (searchParams.add ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  let initialSuggestions: InitialSuggestion[] = [];
  if (addSlugs.length) {
    try {
      const providers = await prisma.provider.findMany({
        where: { slug: { in: addSlugs }, active: true },
        include: { products: { where: { active: true }, take: 1 } },
      });
      initialSuggestions = addSlugs
        .map((slug) => {
          const p = providers.find((pr) => pr.slug === slug);
          if (!p) return null;
          const prod = p.products[0];
          const priceCents = prod
            ? computePrice({
                costCents: prod.costPriceCents,
                tier: 'B2C',
                vatRate: Number(p.vatRate),
                marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
              }).sellPriceCents
            : 0;
          return {
            providerSlug: p.slug,
            name: p.name,
            priceCents,
            reason: 'Toegevoegd via activiteiten-pagina',
            heroImage: providerImage(p, 'sm'),
            bookable: p.bookable,
          };
        })
        .filter((x): x is InitialSuggestion => x !== null);
    } catch (e) {
      console.error('Failed to preload add=', e);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Samensteller', url: '/samensteller' },
        ]}
      />
      <h1 className="font-serif text-4xl text-canal-900 mb-3">Stel je dag samen</h1>
      <p className="text-canal-700 mb-10 max-w-2xl">
        Vertel ons kort wie jullie zijn en wat jullie leuk vinden. Onze AI-gids stelt direct een
        dagprogramma voor uit onze 100+ Utrechtse leveranciers. Pas naar smaak aan.
      </p>
      <Samensteller
        initialAudience={initialAudience}
        initialSuggestions={initialSuggestions}
      />
    </main>
  );
}
