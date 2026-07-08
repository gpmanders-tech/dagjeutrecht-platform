import { prisma } from '@utrecht/db';
import { Mollie } from '@utrecht/integrations';
import { NextResponse } from 'next/server';
import { handlePaidOrder } from '@/lib/fulfilment';

export async function POST(req: Request) {
  const form = await req.formData();
  const id = form.get('id') as string | null;
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    const payment = await Mollie.getPayment(id);
    const order = await prisma.order.findFirst({ where: { molliePaymentId: id } });
    if (!order) return NextResponse.json({ ok: true }); // unknown — Mollie retries

    if (payment.isPaid() && order.status !== 'PAID' && order.status !== 'CONFIRMED' && order.status !== 'FULFILLED') {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID', paidAt: new Date() },
      });
      await handlePaidOrder(order.id);
    } else if (payment.isCanceled() || payment.isFailed() || payment.isExpired()) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'CART' },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Mollie webhook error:', e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
