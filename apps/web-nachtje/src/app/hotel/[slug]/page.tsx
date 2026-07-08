import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { Badge, Card, CardBody, formatEuro, CardImage, providerImageUrl } from '@utrecht/ui';
import { notFound } from 'next/navigation';
import { HotelBookingForm } from '@/components/hotel-booking-form';

export const revalidate = 60;

export default async function HotelPage({ params: { slug } }: { params: { slug: string } }) {
  const hotel = await prisma.provider.findUnique({
    where: { slug },
    include: { products: { where: { active: true }, take: 1 } },
  });

  if (!hotel || hotel.category !== 'HOTEL') notFound();
  const product = hotel.products[0];

  const price = product
    ? computePrice({
        costCents: product.costPriceCents,
        tier: 'B2C',
        vatRate: Number(hotel.vatRate),
        marginOverride: hotel.marginOverride ? Number(hotel.marginOverride) : null,
      })
    : null;

  // Add-on suggesties — populaire boekbare ervaringen
  const addons = await prisma.provider.findMany({
    where: { active: true, bookable: true, category: { in: ['WATER', 'TOUR', 'MUSEUM', 'INDOOR', 'WELLNESS'] } },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: [{ rating: 'desc' }],
    take: 6,
  });

  return (
    <main className="bg-cream">
      <section className="relative bg-canal text-white h-72 md:h-96 overflow-hidden">
        <img
          src={providerImageUrl(hotel.slug, 1600, 600, hotel.heroImage)}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canal via-canal/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-6">
          <p className="text-cream/80 mb-2 text-sm">Nachtje Utrecht</p>
          <div className="flex items-center gap-2 mb-2">
            <Badge tone="default" className="bg-white/20 text-white border-0">{hotel.category}</Badge>
            {hotel.rating && <Badge tone="success">★ {hotel.rating}</Badge>}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl">{hotel.name}</h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl text-canal-900 mb-4">Maak er een arrangement van</h2>
          <p className="text-canal-700 mb-6">
            Combineer je overnachting met een activiteit en/of diner. Wij regelen alles, één boeking, één betaling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addons.map((a) => {
              const aProduct = a.products[0];
              if (!aProduct) return null;
              const aPrice = computePrice({
                costCents: aProduct.costPriceCents,
                tier: 'B2C',
                vatRate: Number(a.vatRate),
                marginOverride: a.marginOverride ? Number(a.marginOverride) : null,
              });
              return (
                <Card key={a.id}>
                  <CardImage slug={a.slug} heroImage={a.heroImage} alt={a.name} />
                  <CardBody>
                    <p className="text-xs text-canal-500">{a.category.toLowerCase()}</p>
                    <p className="font-serif text-lg text-canal-900 mt-0.5">{a.name}</p>
                    {a.rating && <p className="text-xs text-canal-500 mt-1">★ {a.rating}</p>}
                    {aPrice.sellPriceCents > 0 && (
                      <p className="text-sm text-canal-900 mt-2">+{formatEuro(aPrice.sellPriceCents)} p.p.</p>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        <aside>
          <div className="bg-white rounded-2xl border border-canal-100 shadow-soft p-5 sticky top-6">
            {price && (
              <>
                <p className="text-sm text-canal-500">Vanaf</p>
                <p className="font-serif text-3xl text-canal-900">{formatEuro(price.sellPriceCents)}</p>
                <p className="text-xs text-canal-500 mb-4">per nacht</p>
              </>
            )}
            {product && (
              <HotelBookingForm
                hotelSlug={hotel.slug}
                productId={product.id}
                unitPriceCents={price?.sellPriceCents ?? 0}
              />
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
