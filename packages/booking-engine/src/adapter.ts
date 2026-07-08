import type { AvailabilityQuery, BookingRequest } from './types';

export interface AvailabilitySlot {
  startAt: string;       // ISO datetime
  endAt?: string;
  capacityLeft?: number;
  externalSlotId?: string;
}

export interface AvailabilityResult {
  providerSlug: string;
  date: string;
  slots: AvailabilitySlot[];
}

export interface BookingResult {
  externalRef: string;            // boekingsnummer bij leverancier
  status: 'CONFIRMED' | 'PENDING' | 'AWAITING_SUPPLIER';
  vouchers?: Array<{ code: string; pdfUrl?: string; qrPayload?: string }>;
  raw?: unknown;
}

export interface ModifyRequest {
  externalRef: string;
  newScheduledAt?: string;
  newParticipants?: number;
}

export interface CancelResult {
  refundedCents: number;
  status: 'CANCELLED' | 'PARTIAL_REFUND' | 'NO_REFUND';
}

/** Elk extern boekingskanaal implementeert deze interface. */
export interface ProviderAdapter {
  channel: string;
  checkAvailability(q: AvailabilityQuery): Promise<AvailabilityResult>;
  book(req: BookingRequest): Promise<BookingResult>;
  modify(req: ModifyRequest): Promise<BookingResult>;
  cancel(externalRef: string): Promise<CancelResult>;
}
