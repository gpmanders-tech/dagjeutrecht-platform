/**
 * FareHarbor External API v1 — DagjeSuppen.
 * Headers: X-FareHarbor-API-App + X-FareHarbor-API-User.
 */
import type { ProviderAdapter, AvailabilityResult, BookingResult, CancelResult } from '@utrecht/booking-engine';

const COMPANY = process.env.FAREHARBOR_COMPANY_SHORTNAME ?? 'dagjesuppen';

function headers() {
  const app = process.env.FAREHARBOR_API_APP;
  const user = process.env.FAREHARBOR_API_USER;
  if (!app || !user) throw new Error('FAREHARBOR_API_APP/USER ontbreken');
  return { 'X-FareHarbor-API-App': app, 'X-FareHarbor-API-User': user, 'Content-Type': 'application/json' };
}

async function get(path: string) {
  const res = await fetch(`https://fareharbor.com/api/external/v1/companies/${COMPANY}/${path}`, { headers: headers() });
  if (!res.ok) throw new Error(`FareHarbor GET ${path} ${res.status}`);
  return res.json();
}

export async function listItems() {
  return get('items/');
}

export async function listAvailabilities(itemPk: number, date: string) {
  return get(`items/${itemPk}/availabilities/date/${date}/`);
}

export const fareharborAdapter: ProviderAdapter = {
  channel: 'FAREHARBOR',
  async checkAvailability({ date }) {
    // TODO: map provider.externalId (itemPk) en geef echte slots terug
    return { providerSlug: 'dagjesuppen', date, slots: [] } satisfies AvailabilityResult;
  },
  async book() {
    // FareHarbor external bookings vereisen company-specifieke setup; voor nu mail-queue fallback
    throw new Error('FareHarbor.book: nog niet geïmplementeerd — gebruik mail-queue tot keys voltooid');
  },
  async modify() {
    throw new Error('FareHarbor.modify: nog niet geïmplementeerd');
  },
  async cancel() {
    return { refundedCents: 0, status: 'NO_REFUND' } satisfies CancelResult;
  },
};
