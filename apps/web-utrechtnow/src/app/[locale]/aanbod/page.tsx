import { prisma } from '@utrecht/db';
import { computePrice, DEFAULT_MARGIN } from '@utrecht/booking-engine';
import { Card, CardBody, CardTitle, CardMeta, Badge, Button, TipCard, Price, CardImage } from '@utrecht/ui';
import Link from 'next/link';

export const revalidate = 60;

export default async function AanbodPage({ params: { locale } }: { params: { locale: string } }) {
  const providers = await prisma.provider.findMany({
    where: { active: true },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl mb-8 text-canal-900">Aanbod ({providers.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((p) => {
          if (!p.bookable) {
            return (
              <TipCard
                key={p.id}
                title={p.name}
                websiteUrl={p.websiteUrl ?? undefined}
              />
            );
          }
          const product = p.products[0];
          if (!product) return null;
          const { sellPriceCents } = computePrice({
            costCents: product.costPriceCents,
            tier: 'B2C',
            vatRate: Number(p.vatRate),
            marginOverride: p.marginOverride ? Number(p.marginOverride) : null,
          });
          return (
            <Card key={p.id} className="h-full flex flex-col">
              <CardImage slug={p.slug} heroImage={p.heroImage} alt={p.name} />
              <CardBody className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{p.category.toLowerCase()}</Badge>
                  {p.rating && <Badge tone="success">★ {p.rating}</Badge>}
                </div>
                <CardTitle>{p.name}</CardTitle>
                <CardMeta>via {p.channel.toLowerCase()}</CardMeta>
                <div className="mt-auto pt-4 flex items-end justify-between">
                  {sellPriceCents > 0 ? (
                    <Price cents={sellPriceCents} from perPerson />
                  ) : (
                    <span className="text-canal-600 text-sm">Vanaf-prijs op aanvraag</span>
                  )}
                  <Link href={`/${locale}/aanbod/${p.slug}`}>
                    <Button size="sm">Bekijken</Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
