import type { ProviderAdapter } from '@utrecht/booking-engine';

export const getyourguideAdapter: ProviderAdapter = {
  channel: 'GETYOURGUIDE',
  async checkAvailability(q) { return { providerSlug: q.providerSlug, date: q.date, slots: [] }; },
  async book() { throw new Error('GYG partner-key vereist'); },
  async modify() { throw new Error('GYG.modify: stub'); },
  async cancel() { return { refundedCents: 0, status: 'NO_REFUND' }; },
};
