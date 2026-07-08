import { prisma } from '@utrecht/db';
import { Badge } from '@utrecht/ui';
import Link from 'next/link';

export const revalidate = 10;

export default async function ModificationsPage() {
  const mods = await prisma.modification.findMany({
    include: { order: true },
    orderBy: { requestedAt: 'desc' },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-6 text-canal-900">Wijzigingsverzoeken</h1>
      <div className="bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canal-50 text-left text-canal-700">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aangevraagd</th>
              <th className="px-4 py-3">Verrekening</th>
            </tr>
          </thead>
          <tbody>
            {mods.map((m) => (
              <tr key={m.id} className="border-t border-canal-100">
                <td className="px-4 py-2 font-mono">
                  <Link href={`/orders/${m.order.id}`} className="hover:underline">{m.order.publicCode}</Link>
                </td>
                <td className="px-4 py-2">{m.type}</td>
                <td className="px-4 py-2"><Badge>{m.status}</Badge></td>
                <td className="px-4 py-2 text-xs text-canal-500">{m.requestedAt.toLocaleString('nl-NL')}</td>
                <td className="px-4 py-2">
                  {m.priceDeltaCents > 0 && `+${(m.priceDeltaCents / 100).toFixed(2)}`}
                  {m.priceDeltaCents < 0 && `${(m.priceDeltaCents / 100).toFixed(2)}`}
                  {m.priceDeltaCents === 0 && '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mods.length === 0 && <p className="text-center py-12 text-canal-500">Geen wijzigingsverzoeken.</p>}
      </div>
    </div>
  );
}
