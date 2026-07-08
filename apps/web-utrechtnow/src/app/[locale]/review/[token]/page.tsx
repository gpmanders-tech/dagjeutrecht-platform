import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import { ReviewForm } from '@/components/review-form';

export default async function ReviewPage({ params: { token } }: { params: { token: string } }) {
  const order = await prisma.order.findUnique({
    where: { portalToken: token },
    include: { items: { include: { product: { include: { provider: true } } } } },
  });
  if (!order) notFound();
  if (!['FULFILLED', 'CONFIRMED', 'AWAITING_SUPPLIER'].includes(order.status)) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-canal-700">Reviews kunnen pas worden geplaatst na afloop van de boeking.</p>
      </div>
    );
  }

  const existing = await prisma.review.findFirst({ where: { orderId: order.id } });
  if (existing) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-3">⭐</div>
        <h1 className="font-serif text-3xl text-canal-900 mb-2">Bedankt voor je review!</h1>
        <p className="text-canal-700">We waarderen je terugkoppeling.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-terracotta uppercase tracking-wide text-xs mb-2">Review</p>
      <h1 className="font-serif text-3xl text-canal-900">Hoe was je dag in Utrecht?</h1>
      <p className="text-canal-700 mt-2 mb-8">
        Deel je ervaring — andere bezoekers helpen we ermee, en wij gebruiken het om te verbeteren.
      </p>
      <ReviewForm
        orderId={order.id}
        defaultName={order.customerName ?? ''}
        defaultEmail={order.customerEmail}
        providers={order.items.map((it) => ({ id: it.product.providerId, name: it.product.provider.name }))}
      />
    </div>
  );
}
