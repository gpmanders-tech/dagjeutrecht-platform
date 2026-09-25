'use server';

import { prisma } from '@utrecht/db';
import { z } from 'zod';
import {
  TIJDVAKKEN,
  LEVERANCIERS,
  REGELS,
  controleer,
  formatDatum,
  formatEuro,
  prijsPerPersoon,
  vindBouwsteen,
  vindPakket,
  type TijdvakId,
} from '../../lib/aanbod';
import { OPS_MAIL_TO, REPLY_TO, stuurMail } from '../../lib/mail';
import { startInkoop } from '../../lib/inkoop-agent';

const GROEPEN = {
  TEAM: 'Bedrijf of team',
  SCHOOL: 'School',
  STUDENT: 'Studenten',
  BACHELORETTE: 'Vrijgezellen of vrienden',
  FAMILY: 'Familie',
} as const;

const schema = z.object({
  datum: z.string(),
  personen: z.number().int(),
  blokken: z.record(z.string()),
  pakket: z.string().optional(),
  groep: z.enum(['TEAM', 'SCHOOL', 'STUDENT', 'BACHELORETTE', 'FAMILY']),
  naam: z.string().trim().min(2, 'Vul je naam in'),
  email: z.string().trim().email('Vul een geldig e-mailadres in'),
  telefoon: z.string().trim().min(8, 'Vul je telefoonnummer in'),
  bedrijf: z.string().trim().optional(),
  opmerking: z.string().trim().max(1000).optional(),
  /** Honeypot: echte bezoekers laten dit leeg. */
  website: z.string().optional(),
});

export type BoekingInput = z.input<typeof schema>;

export async function submitBoeking(
  input: BoekingInput
): Promise<{ ok: true; code: string } | { ok: false; fouten: string[] }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fouten: parsed.error.issues.map((i) => i.message) };
  }
  const data = parsed.data;
  if (data.website) return { ok: true, code: 'ONTVANGEN' };

  const blokken = Object.fromEntries(
    TIJDVAKKEN.filter((t) => data.blokken[t.id]).map((t) => [t.id, data.blokken[t.id]])
  ) as Partial<Record<TijdvakId, string>>;

  const fouten = controleer({ datum: data.datum, personen: data.personen, blokken });
  if (fouten.length) return { ok: false, fouten };

  const pp = prijsPerPersoon(blokken);
  const totaal = pp * data.personen;
  const pakket = vindPakket(data.pakket);

  const regels = TIJDVAKKEN.flatMap((t) => {
    const b = vindBouwsteen(blokken[t.id]);
    return b ? [{ tijdvak: t, blok: b }] : [];
  });

  // Gestructureerde opdracht voor de inkoop-agent
  const opdracht = {
    versie: 1,
    datum: data.datum,
    personen: data.personen,
    pakket: pakket?.slug ?? null,
    prijsPerPersoonCents: pp,
    totaalCents: totaal,
    onderdelen: regels.map(({ tijdvak, blok }) => ({
      tijdvak: tijdvak.id,
      van: tijdvak.van,
      tot: tijdvak.tot,
      bouwsteen: blok.slug,
      leverancier: blok.leverancier,
      inkoopNiveau: LEVERANCIERS[blok.leverancier].inkoopNiveau,
      inkoopCents: blok.inkoopCents,
      verkoopCents: blok.verkoopCents,
      status: 'nog-in-te-kopen',
    })),
  };

  const enquiry = await prisma.enquiry.create({
    data: {
      channel: 'DAGJE',
      audience: data.groep,
      status: 'NEW',
      contactName: data.naam,
      contactEmail: data.email,
      contactPhone: data.telefoon,
      companyName: data.bedrijf || null,
      requestedDate: new Date(`${data.datum}T12:00:00Z`),
      paxAdults: data.personen,
      paxChildren: 0,
      budgetMinCents: totaal,
      budgetMaxCents: totaal,
      message: data.opmerking || null,
      sourceProgramId: pakket?.slug ?? null,
      notes: {
        create: { author: 'website', body: `inkoop-opdracht ${JSON.stringify(opdracht)}` },
      },
    },
  });

  const code = enquiry.publicCode.slice(-6).toUpperCase();

  {
    const programma = regels
      .map(
        ({ tijdvak, blok }) =>
          `${tijdvak.van}-${tijdvak.tot}  ${blok.naam} (${blok.locatie})  ${formatEuro(blok.verkoopCents)} p.p.`
      )
      .join('\n');

    const inkoop = regels
      .map(
        ({ tijdvak, blok }) =>
          `- ${tijdvak.van} ${blok.naam}: ${LEVERANCIERS[blok.leverancier].naam}, niveau ${LEVERANCIERS[blok.leverancier].inkoopNiveau} (${LEVERANCIERS[blok.leverancier].inkoopWijze})`
      )
      .join('\n');

    await stuurMail({
        aan: OPS_MAIL_TO,
        replyTo: data.email,
        onderwerp: `[DagjeUtrecht] Boeking ${code}: ${formatDatum(data.datum)}, ${data.personen} pers.`,
        tekst: `Nieuwe boekingsaanvraag ${code}

Datum: ${formatDatum(data.datum)}
Personen: ${data.personen}
Pakket: ${pakket?.naam ?? 'zelf samengesteld'}
Totaal: ${formatEuro(totaal)} (${formatEuro(pp)} p.p.)

Contact: ${data.naam} <${data.email}>, ${data.telefoon}
Groep: ${GROEPEN[data.groep]}${data.bedrijf ? `, ${data.bedrijf}` : ''}

Programma:
${programma}

In te kopen:
${inkoop}

Opmerking klant:
${data.opmerking || '(geen)'}
`,
      });

    await stuurMail({
        aan: data.email,
        replyTo: REPLY_TO,
        onderwerp: `Je aanvraag bij DagjeUtrecht.nl (${code})`,
        tekst: `Hoi ${data.naam.split(' ')[0]},

Bedankt voor je aanvraag bij DagjeUtrecht.nl. We controleren nu de beschikbaarheid bij onze partners. Binnen 3 werkdagen krijg je een bevestiging met betaallink. Pas na betaling is de boeking definitief.

Jullie dag: ${formatDatum(data.datum)}, ${data.personen} personen

${programma}

Totaal: ${formatEuro(totaal)} (${formatEuro(pp)} per persoon)

Het aantal personen kan tot ${REGELS.aantalDefinitiefDagenVooraf} dagen voor de datum worden aangepast.

Aanvraagnummer: ${code}
Vragen? Antwoord op deze mail of bel 030 227 14 39.

Groet,
Ger Manders
DagjeUtrecht.nl
`,
      });
  }

  // Inkoop-agent direct laten starten; lukt dat niet, dan pakt de dagelijkse ronde het op
  try {
    await startInkoop(enquiry.id);
  } catch (e) {
    console.error('startInkoop mislukt:', e);
  }

  return { ok: true, code };
}
