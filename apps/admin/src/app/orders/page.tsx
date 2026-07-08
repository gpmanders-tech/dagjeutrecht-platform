import { prisma } from '@utrecht/db';
import { formatEuro, Badge } from '@utrecht/ui';
import Link from 'next/link';

export const revalidate = 10;

const STATUS_TONE: Record<string, 'default' | 'accent' | 'success' | 'tip'> = {
  CART: 'default',
  PENDING_PAYMENT: 'tip',
  PAID: 'success',
  CONFIRMED: 'success',
  FULFILLED: 'success',
  AWAITING_SUPPLIER: 'tip',
  CANCELLED: 'default',
  REFUNDED: 'accent',
  AWAITING_B2B_APPROVAL: 'tip',
};

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    where: { status: { not: 'CART' } },
    include: { items: { include: { product: { include: { provider: true } } } } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-6 text-canal-900">Orders ({orders.length})</h1>
      <div className="bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canal-50 text-left text-canal-700">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Klant</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Totaal</th>
              <th className="px-4 py-3">Marge</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Datum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-canal-100">
                <td className="px-4 py-2 font-mono text-canal-900">
                  <Link href={`/orders/${o.id}`} className="hover:underline">{o.publicCode}</Link>
                </td>
                <td className="px-4 py-2">
                  <p className="text-canal-900">{o.customerName || '—'}</p>
                  <p className="text-xs text-canal-500">{o.customerEmail}</p>
                </td>
                <td className="px-4 py-2 text-canal-700 text-xs">
                  {o.items.map((it) => it.product.provider.name).join(', ')}
                </td>
                <td className="px-4 py-2 text-canal-900">{formatEuro(o.totalCents)}</td>
                <td className="px-4 py-2 text-emerald-700">{formatEuro(o.marginCents)}</td>
                <td className="px-4 py-2"><Badge tone={STATUS_TONE[o.status] ?? 'default'}>{o.status}</Badge></td>
                <td className="px-4 py-2 text-canal-600 text-xs">
                  {o.createdAt.toLocaleString('nl-NL')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center py-12 text-canal-500">Nog geen orders. Maak er één via UtrechtNow.</p>
        )}
      </div>
    </div>
  );
}
