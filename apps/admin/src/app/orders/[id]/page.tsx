import { prisma } from '@utrecht/db';
import { formatEuro, Badge, Button } from '@utrecht/ui';
import { notFound } from 'next/navigation';
import { confirmSupplier } from '@/app/actions/supplier';

export default async function OrderDetail({ params: { id } }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: { include: { provider: true } } } },
      vouchers: true,
      invoice: true,
      modifications: true,
    },
  });
  if (!order) notFound();

  const messages = await prisma.supplierMessage.findMany({
    where: { orderItemId: { in: order.items.map((i) => i.id) } },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-2 text-canal-900">Order {order.publicCode}</h1>
      <p className="text-canal-600 mb-6">{order.createdAt.toLocaleString('nl-NL')} · <Badge>{order.status}</Badge></p>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2 space-y-4">
          <Card title="Klant">
            <p>{order.customerName}</p>
            <p>{order.customerEmail}</p>
            <p>{order.customerPhone}</p>
            {order.invoiceRequested && (
              <p className="mt-3 pt-3 border-t border-canal-100 text-sm">
                <strong>Factuur:</strong> {order.companyName} ({order.vatNumber || 'geen BTW'})
                {order.projectCode && ` · project ${order.projectCode}`}
              </p>
            )}
          </Card>

          <Card title="Onderdelen">
            <ul className="divide-y divide-canal-100">
              {order.items.map((it) => {
                const supplierMsg = messages.find((m) => m.orderItemId === it.id);
                return (
                  <li key={it.id} className="py-3 flex justify-between items-start gap-4">
                    <div>
                      <p className="font-medium text-canal-900">{it.product.provider.name}</p>
                      <p className="text-sm text-canal-600">
                        {it.participants} pers · {it.scheduledAt?.toLocaleString('nl-NL')}
                      </p>
                      <p className="text-xs text-canal-500 mt-1">
                        via {it.channel} · inkoop {formatEuro(it.lineCostCents)} · marge{' '}
                        <span className="text-emerald-700">{formatEuro(it.lineMarginCents)}</span>
                      </p>
                      {supplierMsg && supplierMsg.status === 'queued' && (
                        <form action={confirmSupplier} className="mt-2">
                          <input type="hidden" name="messageId" value={supplierMsg.id} />
                          <Button type="submit" size="sm" variant="outline">
                            ✓ Bevestig bij leverancier
                          </Button>
                        </form>
                      )}
                      {supplierMsg && supplierMsg.status === 'confirmed' && (
                        <Badge tone="success" className="mt-2">✓ Leverancier bevestigd</Badge>
                      )}
                    </div>
                    <span className="text-canal-900 font-medium">{formatEuro(it.lineTotalCents)}</span>
                  </li>
                );
              })}
            </ul>
          </Card>

          {order.vouchers.length > 0 && (
            <Card title={`Vouchers (${order.vouchers.length})`}>
              <ul className="text-sm font-mono space-y-1">
                {order.vouchers.map((v) => (
                  <li key={v.id} className="flex justify-between">
                    <span>{v.code}</span>
                    <Badge tone={v.status === 'REDEEMED' ? 'success' : 'default'}>{v.status}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </section>

        <aside className="space-y-4">
          <Card title="Totalen">
            <Row label="Subtotaal" value={formatEuro(order.subtotalCents)} />
            <Row label="BTW" value={formatEuro(order.vatCents)} />
            <Row label="Totaal" value={formatEuro(order.totalCents)} bold />
            <div className="mt-3 pt-3 border-t border-canal-100">
              <Row label="Inkoop" value={formatEuro(order.costTotalCents)} muted />
              <Row label="Marge" value={formatEuro(order.marginCents)} success />
            </div>
          </Card>
          {order.invoice && (
            <Card title="Factuur (WeFact)">
              <p className="text-sm">{order.invoice.invoiceNumber}</p>
              <Badge>{order.invoice.status}</Badge>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-canal-100 shadow-soft p-5">
      <h2 className="font-serif text-lg text-canal-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  success,
}: { label: string; value: string; bold?: boolean; muted?: boolean; success?: boolean }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <span className={muted ? 'text-canal-500' : 'text-canal-700'}>{label}</span>
      <span className={`${bold ? 'font-semibold' : ''} ${success ? 'text-emerald-700' : 'text-canal-900'}`}>
        {value}
      </span>
    </div>
  );
}
