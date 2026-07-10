import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { AUDIENCES } from '../../lib/audiences';
import { providerImage } from '../../lib/provider-image';
import { Breadcrumbs } from '../../components/seo-jsonld';

export const metadata: Metadata = {
  title: '150+ activiteiten in Utrecht - alle uitjes op een rij',
  description:
    'Musea, water, workshops, restaurants, wellness en meer. Filter op categorie of doelgroep en voeg direct toe aan je dagprogramma.',
  alternates: { canonical: 'https://dagjeutrecht.nl/aanbod' },
};

export const revalidate = 300;

const CATEGORY_LABEL: Record<string, string> = {
  MUSEUM: 'Musea',
  ATTRACTION: 'Attracties',
  INDOOR: 'Indoor',
  WORKSHOP: 'Workshops',
  WATER: 'Water',
  TOUR: 'Tours',
  HOTEL: 'Hotels',
  RESTAURANT: 'Restaurants',
  EVENT: 'Events',
  WELLNESS: 'Wellness',
  SHOP: 'Shop',
};

export default async function AanbodPage({
  searchParams,
}: {
  searchParams: { cat?: string; audience?: string };
}) {
  const providers = await prisma.provider.findMany({
    where: {
      active: true,
      category: { notIn: ['WORKSHOP_SERIES', 'GIFTCARD'] as any },
      ...(searchParams.cat ? { category: searchParams.cat as any } : {}),
      ...(searchParams.audience
        ? { audienceTags: { has: (AUDIENCES.find((a) => a.slug === searchParams.audience)?.db ?? 'TEAM') as any } }
        : {}),
    },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: [{ rating: 'desc' }, { name: 'asc' }],
    take: 200,
  });

  const cats = Object.entries(CATEGORY_LABEL) as Array<[string, string]>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Activiteiten', url: '/aanbod' },
        ]}
      />
      <h1 className="font-serif text-4xl text-canal-900 mb-3">Alle activiteiten</h1>
      <p className="text-canal-700 mb-8 max-w-2xl">
        Blader door onze Utrechtse leveranciers en voeg toe aan je programma.
      </p>

      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Filter href="/aanbod" label="Alles" active={!searchParams.cat && !searchParams.audience} />
          {cats.map(([c, label]) => (
            <Filter
              key={c}
              href={`/aanbod?cat=${c}`}
              label={label}
              active={searchParams.cat === c}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-canal-600 mr-1">Voor:</span>
          {AUDIENCES.map((a) => (
            <Filter
              key={a.slug}
              href={`/aanbod?audience=${a.slug}`}
              label={a.title}
              active={searchParams.audience === a.slug}
            />
          ))}
        </div>
      </div>

      {providers.length === 0 ? (
        <p className="text-canal-500">Geen activiteiten met deze filter.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map((p) => {
            const product = p.products[0];
            const priceCents = product
              ? computePrice({
                  costCents: product.costPriceCents,
                  tier: 'B2C',
                  vatRate: Number(p.vatRate),
                  marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
                }).sellPriceCents
              : null;
            return (
              <Link
                key={p.id}
                href={`/aanbod/${p.slug}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-soft border border-canal-100 hover:border-terracotta-400 transition-colors"
              >
                <img
                  src={providerImage(p, 'md')}
                  alt={p.name}
                  className="w-full h-40 object-cover bg-cream/50"
                />
                {!p.heroImage && (
                  <span className="sr-only">Placeholder foto - echte foto volgt</span>
                )}
                <div className="p-4">
                  <p className="text-xs text-canal-500">{CATEGORY_LABEL[p.category] ?? p.category}</p>
                  <h3 className="font-serif text-lg text-canal-900 mt-0.5">{p.name}</h3>
                  <div className="mt-2 flex items-baseline justify-between text-sm">
                    {priceCents ? (
                      <span className="text-canal-800">vanaf €{(priceCents / 100).toFixed(0)}</span>
                    ) : (
                      <span className="text-canal-500">op aanvraag</span>
                    )}
                    {p.rating && <span className="text-canal-500">★ {p.rating.toFixed(1)}</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

function Filter({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1 text-sm border transition-colors ${
        active
          ? 'bg-canal-900 text-white border-canal-900'
          : 'bg-white text-canal-700 border-canal-200 hover:border-canal-400'
      }`}
    >
      {label}
    </Link>
  );
}
