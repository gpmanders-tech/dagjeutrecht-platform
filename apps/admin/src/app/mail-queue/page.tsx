import { prisma } from '@utrecht/db';
import { Badge, Button } from '@utrecht/ui';
import Link from 'next/link';
import { confirmSupplier } from '@/app/actions/supplier';

export const revalidate = 10;

export default async function MailQueuePage() {
  const messages = await prisma.supplierMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  });

  const orderItemIds = messages.map((m) => m.orderItemId);
  const items = await prisma.orderItem.findMany({
    where: { id: { in: orderItemIds } },
    include: { order: true, product: { include: { provider: true } } },
  });
  const byId = new Map(items.map((i) => [i.id, i]));

  return (
    <div>
      <h1 className="font-serif text-3xl mb-2 text-canal-900">Mail-queue</h1>
      <p className="text-canal-600 mb-6">
        Boekingen bij Direct-leveranciers. Bevestig zodra je de leverancier hebt gemaild en akkoord hebt.
      </p>

      <div className="bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canal-50 text-left text-canal-700">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Leverancier</th>
              <th className="px-4 py-3">Personen · datum</th>
              <th className="px-4 py-3">Aangemaakt</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actie</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => {
              const item = byId.get(m.orderItemId);
              return (
                <tr key={m.id} className="border-t border-canal-100">
                  <td className="px-4 py-2 font-mono text-canal-900">
                    {item && (
                      <Link href={`/orders/${item.order.id}`} className="hover:underline">
                        {item.order.publicCode}
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-2">{item?.product.provider.name}</td>
                  <td className="px-4 py-2 text-canal-700">
                    {item?.participants} pers · {item?.scheduledAt?.toLocaleString('nl-NL')}
                  </td>
                  <td className="px-4 py-2 text-canal-500 text-xs">
                    {m.createdAt.toLocaleString('nl-NL')}
                  </td>
                  <td className="px-4 py-2">
                    <Badge tone={m.status === 'confirmed' ? 'success' : 'tip'}>{m.status}</Badge>
                  </td>
                  <td className="px-4 py-2">
                    {m.status === 'queued' && (
                      <form action={confirmSupplier}>
                        <input type="hidden" name="messageId" value={m.id} />
                        <Button type="submit" size="sm" variant="outline">✓ Bevestigd</Button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {messages.length === 0 && (
          <p className="text-center py-12 text-canal-500">Geen wachtende leverancier-mails.</p>
        )}
      </div>
    </div>
  );
}
