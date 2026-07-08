import type { ProviderAdapter } from '@utrecht/booking-engine';

export const bookingAdapter: ProviderAdapter = {
  channel: 'BOOKING',
  async checkAvailability(q) { return { providerSlug: q.providerSlug, date: q.date, slots: [] }; },
  async book() { throw new Error('Booking.com Demand API key vereist (4-8wk review)'); },
  async modify() { throw new Error('Booking.modify: stub'); },
  async cancel() { return { refundedCents: 0, status: 'NO_REFUND' }; },
};
