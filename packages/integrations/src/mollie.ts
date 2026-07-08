import createMollieClient, { MollieClient, PaymentMethod, SequenceType } from '@mollie/api-client';

let _client: MollieClient | null = null;
function client() {
  if (_client) return _client;
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) throw new Error('MOLLIE_API_KEY ontbreekt');
  _client = createMollieClient({ apiKey });
  return _client;
}

export async function createPayment(opts: {
  orderId: string;
  amountCents: number;
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  method?: PaymentMethod[];
  locale?: 'nl_NL' | 'en_GB' | 'de_DE' | 'fr_FR' | 'es_ES' | 'it_IT' | 'pt_PT';
}) {
  const c = client();
  return c.payments.create({
    amount: { currency: 'EUR', value: (opts.amountCents / 100).toFixed(2) },
    description: opts.description,
    redirectUrl: opts.redirectUrl,
    webhookUrl: opts.webhookUrl ?? process.env.MOLLIE_WEBHOOK_URL,
    metadata: { orderId: opts.orderId },
    sequenceType: SequenceType.oneoff,
    method: opts.method,
    locale: opts.locale,
  });
}

export async function getPayment(id: string) {
  return client().payments.get(id);
}

export async function refundPayment(id: string, amountCents: number, description = 'Refund') {
  return client().paymentRefunds.create({
    paymentId: id,
    amount: { currency: 'EUR', value: (amountCents / 100).toFixed(2) },
    description,
  });
}
