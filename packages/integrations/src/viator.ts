import type { ProviderAdapter } from '@utrecht/booking-engine';

export const viatorAdapter: ProviderAdapter = {
  channel: 'VIATOR',
  async checkAvailability(q) { return { providerSlug: q.providerSlug, date: q.date, slots: [] }; },
  async book() { throw new Error('Viator partner-key vereist'); },
  async modify() { throw new Error('Viator.modify: stub'); },
  async cancel() { return { refundedCents: 0, status: 'NO_REFUND' }; },
};
