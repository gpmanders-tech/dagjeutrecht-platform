'use server';

import { prisma } from '@utrecht/db';
import { z } from 'zod';
import { meldeIntern } from '@/lib/mail';

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
  if (existing) return { error: 'Mit dieser E-Mail-Adresse liegt bereits eine Registrierung vor.' };

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

  // Neue Registrierung als Mail an info@utrechtincoming.nl, damit sie innerhalb von 2 Werktagen geprüft wird
  await meldeIntern({
    betreff: `Neue Partnerregistrierung: ${data.companyName} (${data.country})`,
    text: [
      'Neue Partnerregistrierung über utrechtincoming.nl/registrieren (Status PENDING in der Datenbank).',
      '',
      `Firma: ${data.companyName}`,
      `Kontaktperson: ${data.contactName}`,
      `E-Mail: ${data.email}`,
      `Telefon: ${data.phone || '-'}`,
      `USt-Nummer: ${data.vatNumber || '-'}`,
      `Land: ${data.country}`,
      `Bemerkungen: ${data.notes || '-'}`,
    ].join('\n'),
    antwortAn: data.email,
  }).catch(() => null);

  return { ok: true };
}
