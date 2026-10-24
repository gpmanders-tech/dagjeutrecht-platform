'use server';

import { z } from 'zod';
import { adsKennung, meldeIntern } from '@/lib/mail';

const schema = z.object({
  firma: z.string().min(1).max(200),
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  telefon: z.string().max(60).optional(),
  land: z.string().max(40),
  zeitraum: z.string().max(200).optional(),
  personen: z.string().max(20).optional(),
  art: z.string().max(100).optional(),
  wuensche: z.string().max(3000).optional(),
  herkunft: z.string().max(500).optional(),
  website: z.string().max(0).optional(), // Honeypot, bleibt leer
});

export async function sendeAnfrage(input: z.infer<typeof schema>) {
  const r = schema.safeParse(input);
  if (!r.success) return { error: 'Bitte füllen Sie Firma, Name und eine gültige E-Mail-Adresse aus.' };
  const d = r.data;
  const text = [
    'Neue Gruppenanfrage über utrechtincoming.nl/anfrage',
    '',
    `Firma: ${d.firma}`,
    `Ansprechpartner: ${d.name}`,
    `E-Mail: ${d.email}`,
    `Telefon: ${d.telefon || '-'}`,
    `Land: ${d.land}`,
    `Reisezeitraum: ${d.zeitraum || '-'}`,
    `Gruppengröße: ${d.personen || '-'}`,
    `Art der Gruppe: ${d.art || '-'}`,
    `Wünsche: ${d.wuensche || '-'}`,
    ...(d.herkunft ? [`Herkunft: ${d.herkunft}`] : []),
    '',
    'Antworten (auf Deutsch): einfach auf diese Mail antworten.',
  ].join('\n');
  try {
    await meldeIntern({
      betreff: `${adsKennung(d.herkunft)}Gruppenanfrage: ${d.firma}${d.personen ? `, ${d.personen} Pers.` : ''}`,
      text,
      antwortAn: d.email,
    });
  } catch {
    return { error: 'Das Senden hat leider nicht geklappt. Bitte schreiben Sie uns an info@utrechtincoming.nl.' };
  }
  return { ok: true };
}
