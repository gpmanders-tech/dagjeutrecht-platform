import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { providerImage } from '../../../lib/provider-image';

export const revalidate = 300;

const CATEGORY_LABEL: Record<string, string> = {
  MUSEUM: 'Musea',
  ATTRACTION: 'Attractie',
  INDOOR: 'Indoor',
  WORKSHOP: 'Workshop',
  WORKSHOP_SERIES: 'Workshopreeks',
  WATER: 'Water',
  TOUR: 'Tour',
  HOTEL: 'Hotel',
  RESTAURANT: 'Restaurant',
  EVENT: 'Event',
  WELLNESS: 'Wellness',
  SHOP: 'Winkel',
  GIFTCARD: 'Cadeaubon',
};

export default async function AanbodDetail({ params }: { params: { slug: string } }) {
  const provider = await prisma.provider.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { active: true },
        take: 1,
        include: { translations: { where: { locale: 'nl' } } },
      },
    },
  });
  if (!provider) notFound();

  const product = provider.products[0];
  const translation = product?.translations[0];
  const description = translation?.description;

  const priceCents = product
    ? computePrice({
        costCents: product.costPriceCents,
        tier: 'B2C',
        vatRate: Number(provider.vatRate),
        marginOverride: provider.marginOverride ? Number(provider.marginOverride) : null,
      }).sellPriceCents
    : null;

  const durationMin = product?.durationMinutes;
  const durationLabel =
    durationMin && durationMin >= 60
      ? durationMin % 60 === 0
        ? `${durationMin / 60} uur`
        : `${(durationMin / 60).toFixed(1).replace('.', ',')} uur`
      : durationMin
        ? `${durationMin} min`
        : null;

  return (
    <main>
      <div className="relative bg-canal-100 h-64 sm:h-80 overflow-hidden">
        <img
          src={providerImage(provider, 'lg')}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-[2fr_1fr] gap-10">
        <div>
          <p className="text-canal-500 text-sm">
            {CATEGORY_LABEL[provider.category] ?? provider.category} · {provider.city ?? 'Utrecht'}
          </p>
          <h1 className="font-serif text-4xl text-canal-900 mt-1 mb-3">{provider.name}</h1>
          {provider.rating && (
            <p className="text-canal-600 mb-4">
              ★ {provider.rating.toFixed(1)}{' '}
              {provider.ratingCount ? `(${provider.ratingCount} beoordelingen)` : ''}
            </p>
          )}

          {description && (
            <p className="text-canal-800 text-lg leading-relaxed mb-6">{description}</p>
          )}

          {provider.websiteUrl && (
            <p className="mb-4">
              <a
                href={provider.websiteUrl}
                target="_blank"
                rel="noopener"
                className="text-terracotta-600 hover:underline text-sm"
              >
                Website leverancier ↗
              </a>
            </p>
          )}

          {provider.audienceTags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {provider.audienceTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-cream text-canal-700 border border-canal-200 px-2.5 py-0.5 text-xs"
                >
                  {audienceLabel(t)}
                </span>
              ))}
            </div>
          )}

          <dl className="grid sm:grid-cols-2 gap-3 text-sm text-canal-700 border-t border-canal-100 pt-4">
            {durationLabel && (
              <div>
                <dt className="text-canal-500">Duur</dt>
                <dd>{durationLabel}</dd>
              </div>
            )}
            {(provider.groupMin || provider.groupMax) && (
              <div>
                <dt className="text-canal-500">Groepsgrootte</dt>
                <dd>
                  {provider.groupMin ?? '?'} - {provider.groupMax ?? '?'} personen
                </dd>
              </div>
            )}
            {provider.guideLanguages.length > 0 && (
              <div>
                <dt className="text-canal-500">Gids in</dt>
                <dd>{provider.guideLanguages.join(', ')}</dd>
              </div>
            )}
            {provider.wheelchairAccess && (
              <div>
                <dt className="text-canal-500">Toegankelijkheid</dt>
                <dd>♿ Rolstoel-toegankelijk</dd>
              </div>
            )}
          </dl>
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-canal-200 bg-white p-6">
            {priceCents ? (
              <>
                <p className="text-sm text-canal-600">Vanaf</p>
                <p className="font-serif text-3xl text-canal-900">
                  €{(priceCents / 100).toFixed(2).replace('.', ',')}
                </p>
                <p className="text-sm text-canal-600 mb-4">
                  per persoon{durationLabel ? ` · ${durationLabel}` : ''}
                </p>
              </>
            ) : (
              <p className="text-canal-700 mb-4">Prijs op aanvraag</p>
            )}
            {provider.bookable ? (
              <Link
                href={`/samensteller?add=${provider.slug}`}
                className="block rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white text-center font-medium py-3"
              >
                Voeg toe aan mijn dag
              </Link>
            ) : (
              <p className="text-sm text-canal-500 italic">
                Deze locatie is een tip - je regelt zelf de tickets.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

function audienceLabel(t: string) {
  return (
    {
      TEAM: 'Team',
      STUDENT: 'Studenten',
      SCHOOL: 'School',
      FAMILY: 'Gezin',
      BACHELORETTE: 'Vrijgezel',
      INCOMING_DE: 'DE inbound',
      INCOMING_EN: 'EN inbound',
      INCOMING_FR: 'FR inbound',
      INCOMING_NL: 'NL inbound',
    }[t] ?? t
  );
}
