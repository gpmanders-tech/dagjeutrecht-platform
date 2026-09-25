'use server';

import { prisma } from '@utrecht/db';
import { z } from 'zod';
import { formatDatum } from '../../lib/aanbod';
import { OPS_MAIL_TO, REPLY_TO, stuurMail } from '../../lib/mail';
import { vindOpAanvraag } from '../../lib/op-aanvraag';

const GROEPEN = {
  TEAM: 'Bedrijf of team',
  SCHOOL: 'School',
  STUDENT: 'Studenten',
  BACHELORETTE: 'Vrijgezellen of vrienden',
  FAMILY: 'Familie',
} as const;

const schema = z.object({
  onderwerp: z.string(),
  datum: z.string().optional(),
  personen: z.number().int().min(1, 'Vul het aantal personen in').max(500),
  groep: z.enum(['TEAM', 'SCHOOL', 'STUDENT', 'BACHELORETTE', 'FAMILY']),
  naam: z.string().trim().min(2, 'Vul je naam in'),
  email: z.string().trim().email('Vul een geldig e-mailadres in'),
  telefoon: z.string().trim().optional(),
  opmerking: z.string().trim().max(1000).optional(),
  /** Honeypot: echte bezoekers laten dit leeg. */
  website: z.string().optional(),
});

export type AanvraagInput = z.input<typeof schema>;

/**
 * Korte aanvraag voor een onderwerp op aanvraag (DAG-15): geen programma, geen prijs.
 * Wordt net als een boeking als Enquiry opgeslagen, zodat niets verloren gaat als de mail hapert.
 * De inkoop-agent start hier bewust niet: er is nog geen leverancier vastgelegd.
 */
export async function submitAanvraag(
  input: AanvraagInput
): Promise<{ ok: true; code: string } | { ok: false; fouten: string[] }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, fouten: parsed.error.issues.map((i) => i.message) };
  const data = parsed.data;
  if (data.website) return { ok: true, code: 'ONTVANGEN' };

  const onderwerp = vindOpAanvraag(data.onderwerp);
  if (!onderwerp) return { ok: false, fouten: ['Onbekend onderwerp'] };

  const datum = data.datum && /^\d{4}-\d{2}-\d{2}$/.test(data.datum) ? data.datum : null;

  const enquiry = await prisma.enquiry.create({
    data: {
      channel: 'DAGJE',
      audience: data.groep,
      status: 'NEW',
      contactName: data.naam,
      contactEmail: data.email,
      contactPhone: data.telefoon || null,
      requestedDate: datum ? new Date(`${datum}T12:00:00Z`) : null,
      paxAdults: data.personen,
      paxChildren: 0,
      message: `[Op aanvraag: ${onderwerp.titel}]${data.opmerking ? ` ${data.opmerking}` : ''}`,
      sourceProgramId: `op-aanvraag:${onderwerp.slug}`,
    },
  });

  const code = enquiry.publicCode.slice(-6).toUpperCase();
  const wanneer = datum ? formatDatum(datum) : 'datum nog open';

  await stuurMail({
    aan: OPS_MAIL_TO,
    replyTo: data.email,
    onderwerp: `[DagjeUtrecht] Aanvraag ${code}: ${onderwerp.titel}, ${wanneer}, ${data.personen} pers.`,
    tekst: [
      `Nieuwe aanvraag op aanvraag-pagina /${onderwerp.slug}`,
      '',
      `Onderwerp:  ${onderwerp.titel}`,
      `Datum:      ${wanneer}`,
      `Personen:   ${data.personen}`,
      `Groep:      ${GROEPEN[data.groep]}`,
      `Naam:       ${data.naam}`,
      `E-mail:     ${data.email}`,
      `Telefoon:   ${data.telefoon || '-'}`,
      '',
      `Opmerking:  ${data.opmerking || '-'}`,
      '',
      'Er is nog geen leverancier of prijs vastgelegd voor dit onderwerp: voorstel met de hand maken.',
      'Beantwoord deze mail om de aanvrager direct te mailen.',
    ].join('\n'),
  });

  await stuurMail({
    aan: data.email,
    replyTo: REPLY_TO,
    onderwerp: `Je aanvraag bij DagjeUtrecht.nl (${code})`,
    tekst: [
      `Hoi ${data.naam},`,
      '',
      `Bedankt voor je aanvraag voor ${onderwerp.titel.toLowerCase()} (${wanneer}, ${data.personen} personen).`,
      'We zoeken uit wat er op die dag kan en sturen je binnen een werkdag een voorstel met een prijs per persoon.',
      '',
      'Vragen of iets aanvullen? Beantwoord deze mail of bel 030 227 14 39.',
      '',
      'Groet,',
      'DagjeUtrecht.nl',
    ].join('\n'),
  });

  return { ok: true, code };
}
