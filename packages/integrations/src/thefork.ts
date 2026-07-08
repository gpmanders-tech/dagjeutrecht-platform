import type { ProviderAdapter } from '@utrecht/booking-engine';

export const theforkAdapter: ProviderAdapter = {
  channel: 'THEFORK',
  async checkAvailability(q) { return { providerSlug: q.providerSlug, date: q.date, slots: [] }; },
  async book() { throw new Error('TheFork partner-key vereist'); },
  async modify() { throw new Error('TheFork.modify: stub'); },
  async cancel() { return { refundedCents: 0, status: 'NO_REFUND' }; },
};
