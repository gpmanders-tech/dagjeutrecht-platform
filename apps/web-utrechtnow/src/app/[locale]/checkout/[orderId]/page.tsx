import { prisma } from '@utrecht/db';
import { notFound, redirect } from 'next/navigation';
import { formatEuro } from '@utrecht/ui';
import { CheckoutForm } from '@/components/checkout-form';
import { GiftcardField } from '@/components/giftcard-field';

export default async function CheckoutPage({
  params: { orderId, locale },
}: {
  params: { orderId: string; locale: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: { include: { provider: true } } } } },
  });

  if (!order) notFound();
  if (order.status !== 'CART' && order.status !== 'PENDING_PAYMENT') {
    redirect(`/${locale}/order/${order.publicCode}`);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="font-serif text-3xl text-canal-900 mb-6">Afrekenen</h1>
        <CheckoutForm orderId={order.id} locale={locale} />
      </div>

      <aside>
        <div className="bg-white border border-canal-100 rounded-2xl shadow-soft p-5 sticky top-6">
          <p className="font-serif text-lg text-canal-900 mb-4">Jouw boeking</p>
          <ul className="space-y-3 text-sm">
            {order.items.map((it) => (
              <li key={it.id} className="border-b border-canal-100 pb-3 last:border-0">
                <p className="font-medium text-canal-900">{it.product.provider.name}</p>
                <p className="text-canal-600">
                  {it.participants} pers · {it.scheduledAt ? new Date(it.scheduledAt).toLocaleString('nl-NL') : ''}
                </p>
                <p className="text-canal-900 mt-1">{formatEuro(it.lineTotalCents)}</p>
              </li>
            ))}
          </ul>
          <GiftcardField orderId={order.id} />
          <div className="flex justify-between mt-4 pt-3 border-t border-canal-200">
            <span className="font-medium text-canal-900">Totaal</span>
            <span className="font-serif text-xl text-canal-900">{formatEuro(order.totalCents)}</span>
          </div>
          <p className="text-xs text-canal-500 mt-2">Incl. BTW · betaling via Mollie</p>
        </div>
      </aside>
    </div>
  );
}
