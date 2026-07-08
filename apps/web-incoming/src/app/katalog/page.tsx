import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { Card, CardBody, formatEuro, Badge, CardImage } from '@utrecht/ui';
import { redirect } from 'next/navigation';
import { getPartner } from '@/lib/session';
import { LogoutButton } from '@/components/logout-button';

export const metadata = { title: 'Katalog — Utrecht Incoming' };

export default async function CatalogPage() {
  const partner = await getPartner();
  if (!partner) redirect('/login');

  const providers = await prisma.provider.findMany({
    where: { active: true, bookable: true },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  });

  return (
    <main className="bg-cream min-h-screen text-canal-900">
      <header className="bg-incoming-navy text-white px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-incoming-orange text-xs uppercase tracking-wide">Utrecht Incoming · Partner-Portal</p>
          <p className="font-medium">{partner.companyName}</p>
        </div>
        <LogoutButton />
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl mb-2">Partnerkatalog</h1>
        <p className="text-canal-600 mb-8">
          Alle Preise sind <strong>Partnertarife</strong> (netto, ohne Endkundenmarge). Verfügbarkeit auf Anfrage; Buchungen werden manuell bestätigt.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p) => {
            const product = p.products[0];
            if (!product) return null;
            // Partner krijgt B2B-tier prijs
            const partnerPrice = computePrice({
              costCents: product.costPriceCents,
              tier: 'B2B',
              vatRate: Number(p.vatRate),
              marginOverride: partner.marginOverride
                ? Number(partner.marginOverride)
                : p.marginOverride
                  ? Number(p.marginOverride)
                  : null,
            });
            const b2cPrice = computePrice({
              costCents: product.costPriceCents,
              tier: 'B2C',
              vatRate: Number(p.vatRate),
              marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
            });
            return (
              <Card key={p.id} className="border-canal-100">
                <CardImage slug={p.slug} heroImage={p.heroImage} alt={p.name} />
                <CardBody>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{p.category.toLowerCase()}</Badge>
                    {p.rating && <Badge tone="success">★ {p.rating}</Badge>}
                  </div>
                  <p className="font-serif text-lg text-canal-900">{p.name}</p>
                  <div className="mt-3 flex justify-between items-baseline">
                    <div>
                      <p className="text-xs text-canal-500">Partnertarif</p>
                      <p className="font-medium text-incoming-orange text-lg">
                        {formatEuro(partnerPrice.sellPriceCents)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-canal-400 line-through">{formatEuro(b2cPrice.sellPriceCents)}</p>
                      <p className="text-xs text-canal-500">B2C-Preis</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
