import type { ProviderAdapter } from '@utrecht/booking-engine';

/** Ticketmaster Discovery API — listing only. Werkelijke ticket-issuance via affiliate partner workflow. */
export const ticketmasterAdapter: ProviderAdapter = {
  channel: 'TICKETMASTER',
  async checkAvailability(q) {
    return { providerSlug: q.providerSlug, date: q.date, slots: [] };
  },
  async book() {
    throw new Error('Ticketmaster.book: B2B-key vereist — fallback naar partner-mail');
  },
  async modify() {
    throw new Error('Ticketmaster.modify: niet ondersteund');
  },
  async cancel() {
    return { refundedCents: 0, status: 'NO_REFUND' };
  },
};
