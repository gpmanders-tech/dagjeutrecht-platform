'use server';

import { prisma } from '@utrecht/db';
import { Mollie } from '@utrecht/integrations';
import { headers } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  orderId: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  wantInvoice: z.boolean(),
  companyName: z.string().optional(),
  vatNumber: z.string().optional(),
  projectCode: z.string().optional(),
  locale: z.string(),
});

const MOLLIE_LOCALES: Record<string, 'nl_NL' | 'en_GB' | 'de_DE' | 'fr_FR' | 'es_ES' | 'it_IT' | 'pt_PT'> = {
  nl: 'nl_NL', en: 'en_GB', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', it: 'it_IT', pt: 'pt_PT',
};

export async function startPayment(input: z.infer<typeof schema>) {
  const data = schema.parse(input);

  const order = await prisma.order.findUnique({ where: { id: data.orderId } });
  if (!order) return { error: 'Bestelling niet gevonden.' };
  if (order.status !== 'CART' && order.status !== 'PENDING_PAYMENT') {
    return { error: 'Deze bestelling kan niet meer worden betaald.' };
  }

  // Save customer details on order
  await prisma.order.update({
    where: { id: order.id },
    data: {
      customerEmail: data.email,
      customerName: `${data.firstName} ${data.lastName}`.trim(),
      customerPhone: data.phone,
      invoiceRequested: data.wantInvoice,
      companyName: data.companyName,
      vatNumber: data.vatNumber,
      projectCode: data.projectCode,
      status: 'PENDING_PAYMENT',
    },
  });

  const host = (await headers()).get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  if (!process.env.MOLLIE_API_KEY || process.env.MOLLIE_API_KEY === 'test_xxx') {
    // Geen geldige Mollie key — direct doormarken als PAID voor lokaal testen
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'PAID', paidAt: new Date(), paymentMethod: 'IDEAL' },
    });
    return { checkoutUrl: `${baseUrl}/${data.locale}/order/${order.publicCode}?mock=true` };
  }

  try {
    const payment = await Mollie.createPayment({
      orderId: order.id,
      amountCents: order.totalCents,
      description: `Utrecht Now boeking ${order.publicCode}`,
      redirectUrl: `${baseUrl}/${data.locale}/order/${order.publicCode}`,
      webhookUrl: process.env.MOLLIE_WEBHOOK_URL ?? `${baseUrl}/api/mollie/webhook`,
      locale: MOLLIE_LOCALES[data.locale] ?? 'nl_NL',
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { molliePaymentId: payment.id },
    });

    const checkoutUrl = payment.getCheckoutUrl();
    if (!checkoutUrl) return { error: 'Geen checkout-URL van Mollie ontvangen.' };
    return { checkoutUrl };
  } catch (e: any) {
    return { error: `Betaling kon niet worden gestart: ${e.message}` };
  }
}
