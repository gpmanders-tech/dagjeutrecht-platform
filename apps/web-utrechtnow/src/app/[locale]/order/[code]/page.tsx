import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import { formatEuro } from '@utrecht/ui';
import { handlePaidOrder } from '@/lib/fulfilment';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default async function OrderConfirmationPage({
  params: { code, locale },
  searchParams,
}: {
  params: { code: string; locale: string };
  searchParams: { mock?: string };
}) {
  const order = await prisma.order.findUnique({
    where: { publicCode: code },
    include: {
      items: {
        include: { product: { include: { provider: true } }, vouchers: true },
        orderBy: { scheduledAt: 'asc' },
      },
      vouchers: true,
    },
  });
  if (!order) notFound();

  if (searchParams.mock === 'true' && order.status === 'PAID' && order.vouchers.length === 0) {
    await handlePaidOrder(order.id);
  }

  const isPaid = ['PAID', 'CONFIRMED', 'FULFILLED', 'AWAITING_SUPPLIER'].includes(order.status);
  const programDate = order.items[0]?.scheduledAt;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">{isPaid ? '🎉' : '⏳'}</div>
        <h1 className="font-serif text-4xl text-canal-900">
          {isPaid ? 'Je programma is bevestigd' : 'Betaling in afwachting'}
        </h1>
        <p className="text-canal-600 mt-2">
          Boekingsnummer <strong>{order.publicCode}</strong>
          {programDate && (
            <>
              {' '}· {programDate.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
            </>
          )}
        </p>
        {isPaid && order.customerEmail && (
          <p className="text-sm text-canal-500 mt-1">
            Bevestiging gestuurd naar {order.customerEmail}
          </p>
        )}
      </div>

      {/* Tijdlijn-programma */}
      <div className="bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
        <div className="bg-canal text-cream px-6 py-4">
          <h2 className="font-serif text-xl">Programma</h2>
          <p className="text-xs text-cream/70">{order.items.length} onderdelen</p>
        </div>

        <ol className="divide-y divide-canal-100">
          {order.items.map((it, i) => {
            const time = it.scheduledAt?.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
            const isLast = i === order.items.length - 1;
            return (
              <li key={it.id} className="px-6 py-5 flex gap-5">
                <div className="flex flex-col items-center w-16 shrink-0">
                  <div className="bg-terracotta text-white font-mono text-sm rounded-md px-2 py-1">{time}</div>
                  {!isLast && <div className="w-px bg-canal-200 flex-1 my-2" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-xs text-canal-500 uppercase tracking-wide">Stap {i + 1}</p>
                  <p className="font-serif text-lg text-canal-900 mt-0.5">{it.product.provider.name}</p>
                  <p className="text-sm text-canal-600 mt-1">
                    {it.participants} pers · {formatEuro(it.lineTotalCents)}
                  </p>
                  {it.product.provider.addressLine && (
                    <p className="text-xs text-canal-500 mt-1 inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {it.product.provider.addressLine}, Utrecht
                    </p>
                  )}
                  {it.vouchers.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {it.vouchers.map((v) => (
                        <Link
                          key={v.id}
                          href={`/v/${v.code}`}
                          className="inline-flex items-center gap-1 text-xs font-mono bg-canal-50 text-canal-800 px-2 py-1 rounded hover:bg-canal-100"
                        >
                          🎫 {v.code}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="px-6 py-4 bg-canal-50 flex justify-between items-baseline border-t border-canal-100">
          <span className="text-canal-700">Totaal betaald</span>
          <span className="font-serif text-2xl text-canal-900">{formatEuro(order.totalCents)}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href={`/${locale}/mijn-boeking/${order.portalToken}`}
          className="text-terracotta-600 hover:underline text-sm"
        >
          Bekijk of wijzig mijn boeking →
        </Link>
        <p className="text-xs text-canal-500 mt-3">
          Vragen? Mail <a href="mailto:info@utrechtnow.nl" className="underline">info@utrechtnow.nl</a>
        </p>
      </div>
    </div>
  );
}
