import { prisma } from '@utrecht/db';
import { formatEuro, providerImageUrl } from '@utrecht/ui';
import { computePrice } from '@utrecht/booking-engine';
import Link from 'next/link';

export const revalidate = 30;

export default async function ProvidersPage() {
  const providers = await prisma.provider.findMany({
    include: { products: { take: 1 } },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  });

  const withRealImage = providers.filter((p) => p.heroImage).length;

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="font-serif text-3xl text-canal-900">Leveranciers ({providers.length})</h1>
          <p className="text-sm text-canal-600 mt-1">
            <strong>{withRealImage}</strong> met echte foto · <strong>{providers.length - withRealImage}</strong> met placeholder
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canal-50 text-left text-canal-700">
            <tr>
              <th className="px-4 py-3 w-16"></th>
              <th className="px-4 py-3">Naam</th>
              <th className="px-4 py-3">Categorie</th>
              <th className="px-4 py-3">Kanaal</th>
              <th className="px-4 py-3">Inkoop</th>
              <th className="px-4 py-3">Verkoop</th>
              <th className="px-4 py-3">Marge</th>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => {
              const product = p.products[0];
              const cost = product?.costPriceCents ?? 0;
              const { sellPriceCents, marginCents } = product
                ? computePriceSafe(cost, Number(p.vatRate), p.marginOverride ? Number(p.marginOverride) : null)
                : { sellPriceCents: 0, marginCents: 0 };
              return (
                <tr key={p.id} className="border-t border-canal-100 hover:bg-canal-50/50">
                  <td className="px-4 py-2">
                    <img
                      src={providerImageUrl(p.slug, 80, 60, p.heroImage)}
                      alt=""
                      loading="lazy"
                      className="w-12 h-9 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-canal-900">
                    <Link href={`/providers/${p.id}`} className="hover:underline">{p.name}</Link>
                  </td>
                  <td className="px-4 py-2 text-canal-700">{p.category}</td>
                  <td className="px-4 py-2 text-canal-700">{p.channel}</td>
                  <td className="px-4 py-2 text-canal-700">{cost ? formatEuro(cost) : '—'}</td>
                  <td className="px-4 py-2 text-canal-900">{sellPriceCents ? formatEuro(sellPriceCents) : '—'}</td>
                  <td className="px-4 py-2 text-emerald-700">{marginCents ? formatEuro(marginCents) : '—'}</td>
                  <td className="px-4 py-2">
                    {p.heroImage ? <span className="text-emerald-700">✓</span> : <span className="text-canal-400">—</span>}
                  </td>
                  <td className="px-4 py-2">
                    {p.bookable ? (
                      <span className="text-emerald-700">Boekbaar</span>
                    ) : (
                      <span className="text-amber-700">TIP</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function computePriceSafe(cost: number, vat: number, override: number | null) {
  return computePrice({ costCents: cost, tier: 'B2C', vatRate: vat, marginOverride: override });
}
