import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { Card, CardBody, CardTitle, CardMeta, Price, Badge, CardImage } from '@utrecht/ui';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export async function PopularStrip() {
  const locale = await getLocale();
  const providers = await prisma.provider.findMany({
    where: { active: true, bookable: true, rating: { gte: 4.5 } },
    include: { products: { where: { active: true }, take: 1 } },
    take: 6,
    orderBy: { rating: 'desc' },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((p) => {
        const product = p.products[0];
        if (!product) return null;
        const { sellPriceCents } = computePrice({
          costCents: product.costPriceCents,
          tier: 'B2C',
          vatRate: Number(p.vatRate),
          marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
        });
        return (
          <Link key={p.id} href={`/${locale}/aanbod/${p.slug}`} className="group">
            <Card className="hover:border-terracotta transition-colors h-full">
              <CardImage slug={p.slug} heroImage={p.heroImage} alt={p.name} />
              <CardBody>
                {p.rating && <Badge tone="success" className="mb-2">★ {p.rating}</Badge>}
                <CardTitle>{p.name}</CardTitle>
                <CardMeta>{p.category.toLowerCase()}</CardMeta>
                <div className="mt-3">
                  {sellPriceCents > 0 && <Price cents={sellPriceCents} from perPerson />}
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
