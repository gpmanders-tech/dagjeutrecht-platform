import type { ProviderAdapter, BookingResult } from '@utrecht/booking-engine';

/**
 * Direct/partner-mail fallback voor leveranciers zonder API.
 * Betaling is al binnen; klant ziet "bevestiging volgt binnen 2 uur".
 * Eigenaar ziet item in mail-queue (SupplierMessage tabel) en bevestigt handmatig.
 */
export const directAdapter: ProviderAdapter = {
  channel: 'DIRECT',
  async checkAvailability(q) {
    // Direct providers: meestal "altijd boekbaar binnen openingstijden" — slots terugven via Provider.metadata.openingHours
    return { providerSlug: q.providerSlug, date: q.date, slots: [] };
  },
  async book(req): Promise<BookingResult> {
    // Hier: schrijf SupplierMessage rij in DB en stuur mail naar leverancier (Resend).
    // Voucher wordt al door booking-engine gemaakt.
    return {
      externalRef: `DIRECT-${Date.now()}`,
      status: 'AWAITING_SUPPLIER',
    };
  },
  async modify() {
    return { externalRef: 'pending', status: 'AWAITING_SUPPLIER' };
  },
  async cancel() {
    return { refundedCents: 0, status: 'CANCELLED' };
  },
};
