import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { Badge, Card, CardBody, Price, TipCard, providerImageUrl } from '@utrecht/ui';
import { notFound } from 'next/navigation';
import { BookingForm } from '@/components/booking-form';

export const revalidate = 60;

export default async function ProviderPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const provider = await prisma.provider.findUnique({
    where: { slug },
    include: {
      products: { where: { active: true } },
      translations: { where: { locale: locale as any } },
    },
  });

  if (!provider) notFound();

  const product = provider.products[0];
  const translation = provider.translations[0];

  if (!provider.bookable) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <TipCard
          title={provider.name}
          description={translation?.description}
          openingHours={translation?.openingInfo ?? undefined}
          websiteUrl={provider.websiteUrl ?? undefined}
          mapsUrl={
            provider.lat && provider.lng
              ? `https://maps.google.com/?q=${provider.lat},${provider.lng}`
              : undefined
          }
        />
      </div>
    );
  }

  const price = product
    ? computePrice({
        costCents: product.costPriceCents,
        tier: 'B2C',
        vatRate: Number(provider.vatRate),
        marginOverride: provider.marginOverride ? Number(provider.marginOverride) : null,
      })
    : null;

  return (
    <div>
      {/* Hero foto */}
      <div className="relative h-72 md:h-96 bg-canal overflow-hidden">
        <img
          src={providerImageUrl(provider.slug, 1600, 600, provider.heroImage)}
          alt={provider.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canal via-canal/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge tone="default" className="bg-white/20 text-white border-0">{provider.category.toLowerCase()}</Badge>
            {provider.rating && <Badge tone="success">★ {provider.rating}</Badge>}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl">{provider.name}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <p className="text-canal-700 leading-relaxed">
          {translation?.description ?? 'Beschrijving volgt — laden we binnenkort.'}
        </p>

        <div className="mt-8 bg-canal-50 rounded-xl p-5">
          <h2 className="font-serif text-xl text-canal-900 mb-2">Goed om te weten</h2>
          <ul className="text-sm text-canal-700 space-y-1">
            <li>Boekingskanaal: <span className="font-medium">{provider.channel.toLowerCase()}</span></li>
            <li>Wijzigen tot <span className="font-medium">{provider.modifyDeadlineHours}u</span> voor aanvang
              {provider.canChangeTime ? ' (tijd wijzigbaar)' : ''}
              {provider.canChangeCount ? ', aantal wijzigbaar' : ''}.
            </li>
            {product?.durationMinutes && (
              <li>Duur: ongeveer {product.durationMinutes} minuten</li>
            )}
            {product?.maxParticipants && (
              <li>Max. {product.maxParticipants} personen per groep</li>
            )}
          </ul>
        </div>
      </div>

      <aside className="md:col-span-1">
        <Card className="sticky top-6">
          <CardBody>
            {price && price.sellPriceCents > 0 && (
              <div className="mb-4">
                <Price cents={price.sellPriceCents} from perPerson />
              </div>
            )}
            {product ? (
              <BookingForm
                providerSlug={provider.slug}
                productId={product.id}
                providerName={provider.name}
                unitPriceCents={price?.sellPriceCents ?? 0}
                maxParticipants={product.maxParticipants ?? 50}
                locale={locale}
              />
            ) : (
              <p className="text-sm text-canal-600">Nog geen tijdslots beschikbaar.</p>
            )}
          </CardBody>
        </Card>
      </aside>
      </div>
    </div>
  );
}
