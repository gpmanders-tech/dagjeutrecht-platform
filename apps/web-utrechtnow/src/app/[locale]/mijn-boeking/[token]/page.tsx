import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import { formatEuro, Badge, Button } from '@utrecht/ui';
import { requestCancellation } from '@/app/actions/customer-portal';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { ModifyItemForm } from '@/components/modify-item-form';

export default async function CustomerPortal({
  params: { token, locale },
}: { params: { token: string; locale: string } }) {
  const order = await prisma.order.findUnique({
    where: { portalToken: token },
    include: {
      items: {
        include: {
          product: { include: { provider: true } },
          vouchers: true,
        },
        orderBy: { scheduledAt: 'asc' },
      },
      modifications: { orderBy: { requestedAt: 'desc' } },
    },
  });
  if (!order) notFound();

  const canCancel = ['PAID', 'CONFIRMED', 'AWAITING_SUPPLIER'].includes(order.status);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-terracotta-600 uppercase tracking-wide text-xs mb-2">Mijn boeking</p>
      <h1 className="font-serif text-4xl text-canal-900">{order.publicCode}</h1>
      <p className="text-canal-600 mt-1">
        <Badge>{order.status}</Badge> · {order.items[0]?.scheduledAt?.toLocaleDateString('nl-NL', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })}
      </p>

      {/* Programma */}
      <div className="mt-8 bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
        <div className="bg-canal text-cream px-6 py-3">
          <h2 className="font-serif text-lg">Programma</h2>
        </div>
        <ol className="divide-y divide-canal-100">
          {order.items.map((it, i) => {
            const time = it.scheduledAt?.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
            return (
              <li key={it.id} className="px-5 py-4 flex gap-4">
                <div className="bg-terracotta text-white font-mono text-sm rounded-md px-2 py-1 h-fit shrink-0">{time}</div>
                <div className="flex-1">
                  <p className="font-serif text-lg text-canal-900">{it.product.provider.name}</p>
                  <p className="text-sm text-canal-600">{it.participants} pers</p>
                  {it.product.provider.addressLine && (
                    <p className="text-xs text-canal-500 mt-1 inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {it.product.provider.addressLine}, Utrecht
                    </p>
                  )}
                  {it.vouchers.filter((v) => v.status !== 'REISSUED').length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {it.vouchers.filter((v) => v.status !== 'REISSUED').map((v) => (
                        <Link
                          key={v.id}
                          href={`/v/${v.code}`}
                          className="text-xs font-mono bg-canal-50 text-canal-800 px-2 py-1 rounded hover:bg-canal-100"
                        >
                          🎫 {v.code}
                        </Link>
                      ))}
                    </div>
                  )}
                  {canCancel && it.scheduledAt && (
                    <ModifyItemForm
                      orderItemId={it.id}
                      currentScheduledAt={it.scheduledAt.toISOString()}
                      currentParticipants={it.participants}
                      canChangeTime={it.product.provider.canChangeTime}
                      canChangeCount={it.product.provider.canChangeCount}
                      modifyDeadlineHours={it.product.provider.modifyDeadlineHours}
                    />
                  )}
                </div>
                <span className="text-canal-900 text-sm shrink-0">{formatEuro(it.lineTotalCents)}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Wijzigen/annuleren */}
      {canCancel && (
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-serif text-lg text-canal-900 mb-2">Wijzigen of annuleren</h3>
          <p className="text-sm text-canal-700 mb-4">
            Per leverancier gelden verschillende deadlines. Bij annuleren krijg je het bedrag terug volgens beleid.
          </p>
          <form action={requestCancellation}>
            <input type="hidden" name="orderId" value={order.id} />
            <Button type="submit" variant="outline" size="sm">Annuleer mijn boeking</Button>
          </form>
        </div>
      )}

      {/* Mods log */}
      {order.modifications.length > 0 && (
        <div className="mt-8">
          <h3 className="font-serif text-lg text-canal-900 mb-2">Wijzigingen</h3>
          <ul className="space-y-2 text-sm">
            {order.modifications.map((m) => (
              <li key={m.id} className="bg-white rounded-xl border border-canal-100 p-3 flex justify-between">
                <span>{m.type} — <Badge>{m.status}</Badge></span>
                <span className="text-canal-500 text-xs">{m.requestedAt.toLocaleString('nl-NL')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-center text-xs text-canal-500 mt-10">
        Vragen? <a href="mailto:info@utrechtnow.nl" className="underline">info@utrechtnow.nl</a>
      </p>
    </div>
  );
}
