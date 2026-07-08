/**
 * Na betaling: vouchers maken, leverancier informeren, factuur sturen, klant mailen.
 */
import { prisma } from '@utrecht/db';
import { generateVoucherCode, voucherQrPayload } from '@utrecht/booking-engine';
import { Resend, WeFact } from '@utrecht/integrations';
import { issueGiftcardsForOrder } from '@/lib/giftcards';

export async function handlePaidOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: { include: { provider: true } } } }, invoice: true },
  });
  if (!order) return;

  // 0. Cadeaubonnen uitgeven (per giftcard-item)
  await issueGiftcardsForOrder(order.id);

  // 1. Vouchers genereren (idempotent)
  for (const item of order.items) {
    const existing = await prisma.voucher.count({ where: { orderItemId: item.id } });
    if (existing > 0) continue;
    for (let n = 0; n < item.participants; n++) {
      const code = generateVoucherCode('UN');
      await prisma.voucher.create({
        data: {
          code,
          orderId: order.id,
          orderItemId: item.id,
          qrPayload: voucherQrPayload(code),
          validFrom: item.scheduledAt ?? undefined,
        },
      });
    }
  }

  // 2. Direct-leveranciers in mail-queue
  for (const item of order.items) {
    if (item.channel === 'DIRECT' || item.channel === 'PARTNER_MAIL') {
      const exists = await prisma.supplierMessage.findFirst({ where: { orderItemId: item.id } });
      if (exists) continue;
      await prisma.supplierMessage.create({
        data: {
          orderItemId: item.id,
          providerId: item.product.providerId,
          direction: 'outbound',
          subject: `Boekingsverzoek ${order.publicCode} — ${item.product.provider.name}`,
          body: `Order ${order.publicCode}: ${item.participants} pers, ${item.scheduledAt?.toISOString() ?? ''}.`,
          status: 'queued',
        },
      });
    }
  }

  // 3. WeFact-factuur indien gevraagd
  if (order.invoiceRequested && !order.invoice && process.env.WEFACT_API_KEY) {
    try {
      await createWeFactInvoice(order.id);
    } catch (e) {
      console.error('WeFact failed (non-fatal):', e);
    }
  }

  // 4. Klantmail (Resend, optioneel)
  if (process.env.RESEND_API_KEY) {
    try {
      const fresh = await prisma.order.findUnique({
        where: { id: order.id },
        include: { items: { include: { product: { include: { provider: true } } } }, vouchers: true },
      });
      if (fresh) await Resend.sendMail({
        to: fresh.customerEmail,
        subject: `Bevestiging Utrecht Now — ${fresh.publicCode}`,
        html: renderConfirmation(fresh),
      });
    } catch (e) {
      console.error('Resend failed (non-fatal):', e);
    }
  }

  // 5. Status update
  const hasDirectQueued = await prisma.supplierMessage.count({
    where: { orderItemId: { in: order.items.map((i) => i.id) }, status: 'queued' },
  });
  await prisma.order.update({
    where: { id: order.id },
    data: { status: hasDirectQueued > 0 ? 'AWAITING_SUPPLIER' : 'CONFIRMED' },
  });
}

async function createWeFactInvoice(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: { include: { provider: true } } } } },
  });
  if (!order) return;

  // 1. Vind/maak debtor
  const debtorResp: any = await WeFact.debtor.add({
    CompanyName: order.companyName || order.customerName,
    EmailAddress: order.customerEmail,
    TaxNumber: order.vatNumber || '',
    Telephone: order.customerPhone || '',
  });
  const debtorCode = debtorResp?.debtor?.DebtorCode ?? debtorResp?.DebtorCode;
  if (!debtorCode) throw new Error(`WeFact debtor create failed: ${JSON.stringify(debtorResp)}`);

  // 2. Bouw invoice lines per orderItem
  const InvoiceLines = order.items.map((it) => ({
    Number: it.participants,
    ProductCode: it.product.provider.slug,
    Description: `${it.product.provider.name} (${it.scheduledAt?.toLocaleDateString('nl-NL') ?? ''})`,
    PriceExcl: (it.unitPriceCents / 100 / (1 + Number(it.vatRate))).toFixed(2),
    TaxPercentage: Math.round(Number(it.vatRate) * 100),
  }));

  // 3. Maak factuur
  const invResp: any = await WeFact.invoice.add({
    DebtorCode: debtorCode,
    ProjectCode: order.projectCode || '',
    InvoiceLines,
  });
  const wefactId = invResp?.invoice?.Identifier ?? invResp?.Identifier;
  const number = invResp?.invoice?.InvoiceCode ?? invResp?.InvoiceCode;

  await prisma.invoice.create({
    data: {
      orderId: order.id,
      wefactInvoiceId: wefactId ? String(wefactId) : null,
      invoiceNumber: number ?? null,
      status: 'SENT',
      totalCents: order.totalCents,
      vatCents: order.vatCents,
      sentAt: new Date(),
    },
  });

  // 4. Stuur de factuur
  if (wefactId) {
    try { await WeFact.invoice.send(Number(wefactId)); } catch (e) { console.error('WeFact send failed:', e); }
  }
}

function renderConfirmation(order: any) {
  const lines = order.items
    .map(
      (it: any) =>
        `<li><strong>${it.product.provider.name}</strong><br/>${it.participants} pers · ${
          it.scheduledAt ? new Date(it.scheduledAt).toLocaleString('nl-NL') : ''
        }</li>`,
    )
    .join('');
  const vouchers = order.vouchers
    .map((v: any) => `<li style="font-family:monospace">${v.code}</li>`)
    .join('');
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;color:#1E3A4A">
      <h1 style="font-family:Georgia,serif;color:#1E3A4A">Bedankt voor je boeking</h1>
      <p>Hi ${order.customerName ?? ''}, je boeking <strong>${order.publicCode}</strong> is bevestigd.</p>
      <h2 style="font-family:Georgia,serif;font-size:18px">Onderdelen</h2>
      <ul>${lines}</ul>
      <h2 style="font-family:Georgia,serif;font-size:18px">Vouchers (toon bij bezoek)</h2>
      <ul>${vouchers}</ul>
      <p style="color:#4a7587;font-size:14px">— Utrecht Now</p>
    </div>
  `;
}
