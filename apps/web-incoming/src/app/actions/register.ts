'use server';

import { prisma } from '@utrecht/db';
import { z } from 'zod';

const schema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  vatNumber: z.string().optional(),
  country: z.string(),
  notes: z.string().optional(),
});

export async function registerPartner(input: z.infer<typeof schema>) {
  const data = schema.parse(input);

  const existing = await prisma.partner.findUnique({ where: { email: data.email } });
  if (existing) return { error: 'Een aanvraag met dit e-mailadres staat al ingediend.' };

  await prisma.partner.create({
    data: {
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      vatNumber: data.vatNumber,
      country: data.country,
      notes: data.notes,
      status: 'PENDING',
      preferredLocale: data.country === 'NL' ? 'nl' : data.country === 'FR' ? 'fr' : 'de',
    },
  });

  return { ok: true };
}
