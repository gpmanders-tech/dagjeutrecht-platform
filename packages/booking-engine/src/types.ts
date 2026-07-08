import { z } from 'zod';

export const ParticipantSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().int().min(0).max(120).optional(),
});

export const AvailabilityQuerySchema = z.object({
  providerSlug: z.string(),
  productSlug: z.string().default('default'),
  date: z.string(),               // ISO date (YYYY-MM-DD)
  participants: z.number().int().min(1).default(1),
});

export const BookingRequestSchema = z.object({
  providerSlug: z.string(),
  productSlug: z.string().default('default'),
  scheduledAt: z.string(),        // ISO datetime
  participants: z.number().int().min(1),
  customer: z.object({
    email: z.string().email(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    locale: z.enum(['nl', 'en', 'de', 'fr', 'es', 'it', 'pt']).default('nl'),
  }),
  notes: z.string().optional(),
});

export type AvailabilityQuery = z.infer<typeof AvailabilityQuerySchema>;
export type BookingRequest = z.infer<typeof BookingRequestSchema>;
