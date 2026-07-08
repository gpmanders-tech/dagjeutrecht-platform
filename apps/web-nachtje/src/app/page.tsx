import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { Card, CardBody, CardTitle, CardMeta, Price, Badge, UtrechtSkyline, CardImage } from '@utrecht/ui';
import Link from 'next/link';

export const revalidate = 300;

export default async function Home() {
  const hotels = await prisma.provider.findMany({
    where: { category: 'HOTEL', active: true },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: { name: 'asc' },
  });

  return (
    <main>
      <section className="relative overflow-hidden bg-canal text-white">
        <UtrechtSkyline className="absolute inset-x-0 bottom-0 w-full h-[55%] text-white opacity-[0.12] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <p className="text-cream/80 mb-3">Nachtje Utrecht</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-2xl">
            Blijf slapen na een dagje Utrecht.
          </h1>
          <p className="text-xl text-cream/90 max-w-xl">
            Boek hotel, activiteit en diner in één keer. Combineer wat je wilt — wij regelen de rest.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl mb-8 text-canal-900">Hotels in Utrecht ({hotels.length})</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {hotels.map((h) => {
            const product = h.products[0];
            if (!product) return null;
            const { sellPriceCents } = computePrice({
              costCents: product.costPriceCents,
              tier: 'B2C',
              vatRate: Number(h.vatRate),
            });
            return (
              <Link key={h.id} href={`/hotel/${h.slug}`}>
                <Card className="hover:border-terracotta transition-colors h-full">
                  <CardImage slug={h.slug} heroImage={h.heroImage} alt={h.name} />
                  <CardBody>
                    {h.rating && <Badge tone="success" className="mb-2">★ {h.rating}</Badge>}
                    <CardTitle>{h.name}</CardTitle>
                    <CardMeta>Utrecht · Booking.com</CardMeta>
                    <div className="mt-3">
                      <Price cents={sellPriceCents} from label={{ from: 'Vanaf', perPerson: '/nacht' }} perPerson />
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
