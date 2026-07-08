import { prisma } from '@utrecht/db';
import { computePrice } from '@utrecht/booking-engine';
import { Card, CardBody, formatEuro, Badge, Button, CardImage } from '@utrecht/ui';
import Link from 'next/link';

export const revalidate = 60;

const CATEGORY_ICONS: Record<string, string> = {
  nijntje: '🐰',
  utrecht: '🗼',
  fcutrecht: '⚽',
  bier: '🍺',
  borrel: '🥂',
  kerstpakket: '🎁',
  stroopwafels: '🍪',
  chocolade: '🍫',
  gift: '🎟️',
};

function emojiFor(slug: string) {
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (slug.includes(key)) return CATEGORY_ICONS[key];
  }
  return '🛍️';
}

export default async function ShopPage({ params: { locale } }: { params: { locale: string } }) {
  const items = await prisma.provider.findMany({
    where: { active: true, category: { in: ['SHOP', 'GIFTCARD'] } },
    include: { products: { where: { active: true }, take: 1 } },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  });

  const gifts = items.filter((p) => p.category === 'GIFTCARD');
  const shop = items.filter((p) => p.category === 'SHOP');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-terracotta-600 uppercase text-xs tracking-wide mb-2">Webshop</p>
      <h1 className="font-serif text-4xl text-canal-900 mb-2">Utrecht in een doosje</h1>
      <p className="text-canal-700 mb-10 max-w-2xl">
        Souvenirs, streekproducten, zakelijke kerstpakketten en cadeaubonnen. Verzonden door PostNL of af te halen aan het Domplein.
      </p>

      <h2 className="font-serif text-2xl text-canal-900 mb-4">🎟️ Cadeaubonnen</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {gifts.map((p) => {
          const product = p.products[0];
          if (!product) return null;
          // Cadeaubonnen: nominale waarde, geen marge
          return (
            <Card key={p.id}>
              <CardBody>
                <div className="text-4xl mb-2">🎟️</div>
                <p className="font-serif text-lg text-canal-900">{p.name}</p>
                <p className="font-medium text-canal-900 mt-2">{formatEuro(product.costPriceCents)}</p>
                <Link href={`/${locale}/aanbod/${p.slug}`}>
                  <Button size="sm" variant="outline" className="mt-3 w-full">Kopen</Button>
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <h2 className="font-serif text-2xl text-canal-900 mb-4">🛍️ Producten</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shop.map((p) => {
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
              <CardImage slug={p.slug} heroImage={p.heroImage} alt={p.name} ratio="aspect-square" />
              <CardBody className="flex-1 flex flex-col">
                <p className="font-serif text-base text-canal-900 leading-tight">{p.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge>{product.fulfilment.toLowerCase()}</Badge>
                </div>
                <p className="font-medium text-canal-900 mt-2">{formatEuro(sellPriceCents)}</p>
                <Link href={`/${locale}/aanbod/${p.slug}`} className="mt-auto pt-3">
                  <Button size="sm" className="w-full">In winkelmandje</Button>
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 bg-canal-50 rounded-2xl p-6 grid sm:grid-cols-3 gap-4 text-sm text-canal-700">
        <div><strong>📦 PostNL</strong><br/>€4,95 (gratis vanaf €50)</div>
        <div><strong>⚡ Express</strong><br/>€9,95</div>
        <div><strong>📍 Afhalen</strong><br/>Gratis op Domplein</div>
      </div>
    </div>
  );
}
