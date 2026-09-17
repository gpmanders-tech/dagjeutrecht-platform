/**
 * Inkoop-agent DagjeUtrecht.
 *
 * Stappen per boeking:
 * 1. startInkoop: per onderdeel een inkooporder; eigen kickbikes direct bevestigen als
 *    de vloot het toelaat; per leverancier één bestelmail met bevestiglink.
 * 2. verwerkAntwoord: leverancier klikt bevestigen of afwijzen.
 * 3. Alles bevestigd: betaallink (Mollie) naar de klant.
 * 4. dagelijkseRonde: herinneringen, meldingen aan Ger, dag-ervoor-mail.
 *
 * Alle stappen zijn veilig om vaker te draaien: ze kijken eerst naar de status.
 */
import { randomBytes } from 'node:crypto';
import { prisma, type Enquiry, type Inkooporder } from '@utrecht/db';
import {
  LEVERANCIERS,
  TIJDVAKKEN,
  formatDatum,
  formatEuro,
  vindBouwsteen,
  type LeverancierId,
  type TijdvakId,
} from './aanbod';
import { AGENT_LIVE, OPS_MAIL_TO, stuurAgentMail, stuurMail } from './mail';

const UUR = 3_600_000;
const HERINNERING_NA = 24 * UUR;
const MELDING_NA_HERINNERING = 24 * UUR;
const BETAALTERMIJN = 3 * 24 * UUR;

const GER_TELEFOON = '030 227 14 39';

function env(naam: string) {
  return (process.env[naam] || '').trim();
}

export function siteUrl() {
  if (env('NEXT_PUBLIC_SITE_URL')) return env('NEXT_PUBLIC_SITE_URL');
  if (process.env.VERCEL_ENV === 'production') return 'https://www.dagjeutrecht.nl';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3001';
}

function leverancierEmail(l: LeverancierId) {
  return env(`LEVERANCIER_${l}_EMAIL`);
}

function kortCode(e: Pick<Enquiry, 'publicCode'>) {
  return e.publicCode.slice(-6).toUpperCase();
}

function naamBlok(slug: string) {
  return vindBouwsteen(slug)?.naam ?? slug;
}

function tijdvakVolgorde(t: string) {
  return TIJDVAKKEN.findIndex((x) => x.id === t);
}

async function meldGer(onderwerp: string, tekst: string) {
  return stuurMail({ aan: OPS_MAIL_TO, onderwerp: `[Inkoop-agent] ${onderwerp}`, tekst });
}

// ============== 1. Start ==============

type Opdracht = {
  datum: string;
  personen: number;
  onderdelen: Array<{ tijdvak: TijdvakId; van: string; tot: string; bouwsteen: string; leverancier: LeverancierId; inkoopCents: number }>;
};

function leesOpdracht(notes: Array<{ body: string }>): Opdracht | null {
  const n = notes.find((x) => x.body.startsWith('inkoop-opdracht '));
  if (!n) return null;
  try {
    return JSON.parse(n.body.slice('inkoop-opdracht '.length));
  } catch {
    return null;
  }
}

export async function startInkoop(enquiryId: string) {
  const enquiry = await prisma.enquiry.findUnique({
    where: { id: enquiryId },
    include: { notes: true, inkooporders: true },
  });
  if (!enquiry || enquiry.inkooporders.length > 0) return;
  const opdracht = leesOpdracht(enquiry.notes);
  if (!opdracht) return;

  const tokens = new Map<string, string>();
  const datum = new Date(`${opdracht.datum}T12:00:00Z`);

  await prisma.$transaction([
    prisma.inkooporder.createMany({
      data: opdracht.onderdelen.map((o) => {
        if (!tokens.has(o.leverancier)) tokens.set(o.leverancier, randomBytes(18).toString('base64url'));
        return {
          enquiryId: enquiry.id,
          tijdvak: o.tijdvak,
          bouwsteen: o.bouwsteen,
          leverancier: o.leverancier,
          datum,
          van: o.van,
          tot: o.tot,
          personen: opdracht.personen,
          inkoopCents: o.inkoopCents * opdracht.personen,
          token: tokens.get(o.leverancier)!,
        };
      }),
    }),
    prisma.enquiry.update({ where: { id: enquiry.id }, data: { status: 'IN_PROGRESS' } }),
  ]);

  await bevestigEigenKickbikes(enquiry.id);
  await verstuurBestellingen(enquiry.id);
  await controleerCompleet(enquiry.id);
}

/** Eigen kickbikes: automatisch bevestigen als de vloot genoeg vrije kickbikes heeft. */
async function bevestigEigenKickbikes(enquiryId: string) {
  const vloot = Number(env('KICKBIKE_VLOOT') || '0');
  if (!vloot) return; // niet ingesteld: gaat als gewone bestelling naar Ger

  const orders = await prisma.inkooporder.findMany({
    where: { enquiryId, leverancier: 'STEPVERHUUR', status: 'TE_VERSTUREN' },
  });
  for (const o of orders) {
    const bezet = await prisma.inkooporder.aggregate({
      _sum: { personen: true },
      where: {
        leverancier: 'STEPVERHUUR',
        datum: o.datum,
        status: 'BEVESTIGD',
        id: { not: o.id },
      },
    });
    const vrij = vloot - (bezet._sum.personen ?? 0);
    const ok = vrij >= o.personen;
    await prisma.inkooporder.update({
      where: { id: o.id },
      data: ok
        ? { status: 'BEVESTIGD', beantwoordOp: new Date(), opmerking: 'Automatisch bevestigd (eigen vloot)' }
        : { status: 'AFGEWEZEN', beantwoordOp: new Date(), opmerking: `Nog ${Math.max(vrij, 0)} kickbikes vrij` },
    });
    if (!ok) {
      await meldGer(
        `Te weinig kickbikes op ${formatDatum(o.datum.toISOString().slice(0, 10))}`,
        `Er zijn nog ${Math.max(vrij, 0)} kickbikes vrij, de groep heeft er ${o.personen} nodig.\nEventueel bijhuren bij De Rijnstroom en daarna handmatig bevestigen.`
      );
    }
  }
}

function bestelTekst(e: Enquiry, orders: Inkooporder[], herinnering: boolean) {
  const eerste = orders[0]!;
  const regels = [...orders]
    .sort((a, b) => tijdvakVolgorde(a.tijdvak) - tijdvakVolgorde(b.tijdvak))
    .map((o) => `- ${o.van} tot ${o.tot}: ${naamBlok(o.bouwsteen)}, ${o.personen} personen`)
    .join('\n');
  const link = `${siteUrl()}/inkoop/${eerste.token}`;

  return `Beste partner,

${herinnering ? 'Herinnering: we hebben nog geen reactie ontvangen op onderstaande bestelling.\n\n' : ''}DagjeUtrecht.nl wil graag het volgende reserveren:

Datum: ${formatDatum(eerste.datum.toISOString().slice(0, 10))}
${regels}

Referentie: ${kortCode(e)}

Bevestigen of doorgeven dat het niet kan, doe je met één klik:
${link}

Contactpersoon op de dag zelf is Ger Manders, ${GER_TELEFOON}.

Met vriendelijke groet,
DagjeUtrecht.nl
`;
}

async function verstuurBestellingen(enquiryId: string) {
  const e = await prisma.enquiry.findUnique({
    where: { id: enquiryId },
    include: { inkooporders: { where: { status: 'TE_VERSTUREN' } } },
  });
  if (!e) return;

  const perToken = new Map<string, Inkooporder[]>();
  for (const o of e.inkooporders) perToken.set(o.token, [...(perToken.get(o.token) ?? []), o]);

  for (const orders of perToken.values()) {
    const lev = orders[0]!.leverancier as LeverancierId;
    const adres = leverancierEmail(lev);
    const onderwerp = `Bestelling DagjeUtrecht ${kortCode(e)}: ${formatDatum(orders[0]!.datum.toISOString().slice(0, 10))}`;
    const tekst = bestelTekst(e, orders, false);

    const verstuurd = adres
      ? await stuurAgentMail({ aan: adres, onderwerp, tekst })
      : await meldGer(
          `Geen e-mailadres voor ${LEVERANCIERS[lev].naam}`,
          `Zet LEVERANCIER_${lev}_EMAIL in Vercel, of stuur deze bestelling zelf door (of bevestig hem via de link).\n\n${tekst}`
        );

    if (verstuurd) {
      await prisma.inkooporder.updateMany({
        where: { id: { in: orders.map((o) => o.id) }, status: 'TE_VERSTUREN' },
        data: { status: 'VERSTUURD', verstuurdOp: new Date() },
      });
    }
  }
}

// ============== 2. Antwoord leverancier ==============

export async function verwerkAntwoord(token: string, akkoord: boolean, opmerking?: string) {
  const orders = await prisma.inkooporder.findMany({ where: { token }, include: { enquiry: true } });
  if (orders.length === 0) return { ok: false as const };

  const open = orders.filter((o) => o.status === 'VERSTUURD' || o.status === 'TE_VERSTUREN');
  if (open.length === 0) return { ok: true as const, alBeantwoord: true };

  await prisma.inkooporder.updateMany({
    where: { id: { in: open.map((o) => o.id) } },
    data: {
      status: akkoord ? 'BEVESTIGD' : 'AFGEWEZEN',
      beantwoordOp: new Date(),
      opmerking: opmerking?.slice(0, 1000) || null,
    },
  });

  const e = orders[0]!.enquiry;
  const lev = LEVERANCIERS[orders[0]!.leverancier as LeverancierId]?.naam ?? orders[0]!.leverancier;
  if (!akkoord) {
    await meldGer(
      `${lev} kan niet voor ${kortCode(e)}`,
      `${lev} heeft de bestelling voor ${e.contactName} (${formatDatum(orders[0]!.datum.toISOString().slice(0, 10))}, ${e.paxAdults} pers.) afgewezen.

Onderdelen: ${open.map((o) => naamBlok(o.bouwsteen)).join(', ')}
Opmerking leverancier: ${opmerking || '(geen)'}

Neem contact op met de klant: ${e.contactEmail}, ${e.contactPhone ?? ''}.
Er is nog geen betaallink verstuurd.`
    );
  } else {
    await controleerCompleet(e.id);
  }
  return { ok: true as const, alBeantwoord: false };
}

// ============== 3. Betalen ==============

async function maakMolliebetaling(e: Enquiry) {
  const key = env('MOLLIE_API_KEY');
  if (!key || !e.budgetMinCents) return null;
  const res = await fetch('https://api.mollie.com/v2/payments', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: { currency: 'EUR', value: (e.budgetMinCents / 100).toFixed(2) },
      description: `DagjeUtrecht ${kortCode(e)}`,
      redirectUrl: `${siteUrl()}/betaald?code=${kortCode(e)}`,
      webhookUrl: `${siteUrl()}/api/mollie`,
      metadata: { enquiryId: e.id },
      locale: 'nl_NL',
    }),
  });
  if (!res.ok) {
    console.error('Mollie betaling mislukt', res.status, await res.text());
    return null;
  }
  const p = (await res.json()) as { id: string; _links: { checkout?: { href: string } } };
  return p._links.checkout ? { id: p.id, url: p._links.checkout.href } : null;
}

function programmaTekst(orders: Inkooporder[]) {
  return [...orders]
    .sort((a, b) => tijdvakVolgorde(a.tijdvak) - tijdvakVolgorde(b.tijdvak))
    .map((o) => {
      const b = vindBouwsteen(o.bouwsteen);
      return `${o.van} tot ${o.tot}  ${b?.naam ?? o.bouwsteen}\n              ${b?.locatie ?? ''}`;
    })
    .join('\n');
}

async function controleerCompleet(enquiryId: string) {
  const e = await prisma.enquiry.findUnique({ where: { id: enquiryId }, include: { inkooporders: true } });
  if (!e || e.status !== 'IN_PROGRESS' || e.betaalLinkOp || e.inkooporders.length === 0) return;
  if (!e.inkooporders.every((o) => o.status === 'BEVESTIGD')) return;

  // Eerst markeren, zodat twee gelijktijdige bevestigingen niet twee betaallinks maken
  const gemarkeerd = await prisma.enquiry.updateMany({
    where: { id: e.id, betaalLinkOp: null },
    data: { betaalLinkOp: new Date(), status: 'QUOTED' },
  });
  if (gemarkeerd.count === 0) return;

  const betaling = await maakMolliebetaling(e);
  if (betaling) {
    await prisma.enquiry.update({
      where: { id: e.id },
      data: { molliePaymentId: betaling.id, betaalUrl: betaling.url },
    });
  }

  const datum = formatDatum(e.inkooporders[0]!.datum.toISOString().slice(0, 10));
  await stuurAgentMail({
    aan: e.contactEmail,
    onderwerp: `Bevestigd: jullie dag in Utrecht op ${datum} (${kortCode(e)})`,
    tekst: `Hoi ${e.contactName.split(' ')[0]},

Goed nieuws: alle onderdelen van jullie dag zijn bevestigd door onze partners.

${datum}, ${e.paxAdults} personen

${programmaTekst(e.inkooporders)}

Totaal: ${formatEuro(e.budgetMinCents ?? 0)}

${
  betaling
    ? `Rond de boeking af door binnen 3 dagen te betalen:\n${betaling.url}\n\nNa betaling is de boeking definitief.`
    : 'Je ontvangt binnenkort een betaalverzoek. Na betaling is de boeking definitief.'
}

De dag voor het uitje sturen we alle praktische informatie.

Groet,
Ger Manders
DagjeUtrecht.nl
`,
  });

  if (!betaling) {
    await meldGer(
      `Alles bevestigd voor ${kortCode(e)}, stuur betaalverzoek`,
      `Alle onderdelen voor ${e.contactName} zijn bevestigd. Er is geen Mollie-sleutel ingesteld, dus stuur zelf een factuur of betaalverzoek van ${formatEuro(e.budgetMinCents ?? 0)}.${e.companyName ? `\nOp naam van: ${e.companyName}` : ''}`
    );
  }
}

export async function verwerkBetaling(paymentId: string) {
  const key = env('MOLLIE_API_KEY');
  if (!key) return;
  const res = await fetch(`https://api.mollie.com/v2/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) return;
  const p = (await res.json()) as { status: string };

  const e = await prisma.enquiry.findFirst({ where: { molliePaymentId: paymentId } });
  if (!e || e.betaaldOp) return;

  if (p.status === 'paid') {
    await prisma.enquiry.update({ where: { id: e.id }, data: { betaaldOp: new Date(), status: 'WON' } });
    await meldGer(
      `Betaald: ${kortCode(e)}`,
      `${e.contactName} heeft ${formatEuro(e.budgetMinCents ?? 0)} betaald. De boeking is definitief.`
    );
  } else if (p.status === 'expired' || p.status === 'failed' || p.status === 'canceled') {
    await meldGer(
      `Betaling ${p.status}: ${kortCode(e)}`,
      `De betaling van ${e.contactName} (${e.contactEmail}) is ${p.status}. Neem contact op of annuleer de reserveringen bij de partners.`
    );
  }
}

// ============== 4. Dagelijkse ronde ==============

function morgenIso() {
  const nu = new Date(Date.now() + 24 * UUR);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(nu);
}

export async function dagelijkseRonde() {
  const nu = Date.now();
  const log: string[] = [];

  // a. Nieuwe boekingen waar de inkoop nog niet voor gestart is
  const nieuw = await prisma.enquiry.findMany({
    where: { channel: 'DAGJE', status: 'NEW', inkooporders: { none: {} }, notes: { some: { body: { startsWith: 'inkoop-opdracht ' } } } },
    select: { id: true },
  });
  for (const e of nieuw) {
    await startInkoop(e.id);
    log.push(`gestart ${e.id}`);
  }

  // b. Bestellingen die nog niet verstuurd konden worden
  const teVersturen = await prisma.inkooporder.findMany({
    where: { status: 'TE_VERSTUREN' },
    distinct: ['enquiryId'],
    select: { enquiryId: true },
  });
  for (const o of teVersturen) await verstuurBestellingen(o.enquiryId);

  // c. Herinneringen
  const zonderReactie = await prisma.inkooporder.findMany({
    where: { status: 'VERSTUURD', herinneringOp: null, verstuurdOp: { lt: new Date(nu - HERINNERING_NA) } },
    include: { enquiry: true },
  });
  const perToken = new Map<string, typeof zonderReactie>();
  for (const o of zonderReactie) perToken.set(o.token, [...(perToken.get(o.token) ?? []), o]);
  for (const orders of perToken.values()) {
    const lev = orders[0]!.leverancier as LeverancierId;
    const adres = leverancierEmail(lev);
    const onderwerp = `Herinnering: bestelling DagjeUtrecht ${kortCode(orders[0]!.enquiry)}`;
    const tekst = bestelTekst(orders[0]!.enquiry, orders, true);
    const ok = adres
      ? await stuurAgentMail({ aan: adres, onderwerp, tekst })
      : await meldGer(`${onderwerp} (geen adres voor ${LEVERANCIERS[lev].naam})`, tekst);
    if (ok) {
      await prisma.inkooporder.updateMany({
        where: { id: { in: orders.map((o) => o.id) } },
        data: { herinneringOp: new Date() },
      });
      log.push(`herinnering ${lev} ${orders[0]!.enquiryId}`);
    }
  }

  // d. Nog steeds geen reactie na herinnering: Ger één keer melden
  const stil = await prisma.enquiry.findMany({
    where: {
      status: 'IN_PROGRESS',
      agentMeldingOp: null,
      inkooporders: { some: { status: 'VERSTUURD', herinneringOp: { lt: new Date(nu - MELDING_NA_HERINNERING) } } },
    },
    include: { inkooporders: true },
  });
  for (const e of stil) {
    const open = e.inkooporders.filter((o) => o.status === 'VERSTUURD');
    await meldGer(
      `Geen reactie van partner voor ${kortCode(e)}`,
      `Ondanks een herinnering is er nog geen reactie op:\n${open
        .map((o) => `- ${LEVERANCIERS[o.leverancier as LeverancierId]?.naam}: ${naamBlok(o.bouwsteen)}`)
        .join('\n')}\n\nBel de partner even. Bevestigen kan ook via de link: ${siteUrl()}/inkoop/${open[0]!.token}`
    );
    await prisma.enquiry.update({ where: { id: e.id }, data: { agentMeldingOp: new Date() } });
    log.push(`melding geen reactie ${e.id}`);
  }

  // e. Betaallink verstuurd maar niet betaald
  const onbetaald = await prisma.enquiry.findMany({
    where: { status: 'QUOTED', betaaldOp: null, betaalLinkOp: { lt: new Date(nu - BETAALTERMIJN) } },
  });
  for (const e of onbetaald) {
    if (e.agentMeldingOp && e.betaalLinkOp && e.agentMeldingOp > e.betaalLinkOp) continue;
    await meldGer(
      `Nog niet betaald: ${kortCode(e)}`,
      `${e.contactName} (${e.contactEmail}, ${e.contactPhone ?? ''}) heeft 3 dagen na de betaallink nog niet betaald.\nNeem contact op of annuleer de reserveringen bij de partners.`
    );
    await prisma.enquiry.update({ where: { id: e.id }, data: { agentMeldingOp: new Date() } });
    log.push(`melding onbetaald ${e.id}`);
  }

  // f. Dag-ervoor-mail met praktische informatie
  const morgen = new Date(`${morgenIso()}T12:00:00Z`);
  const morgenBoekingen = await prisma.enquiry.findMany({
    where: { status: 'WON', dagInfoOp: null, requestedDate: morgen },
    include: { inkooporders: true },
  });
  for (const e of morgenBoekingen) {
    const heeftKickbike = e.inkooporders.some((o) => o.bouwsteen === 'kickbike-tocht');
    const ok = await stuurAgentMail({
      aan: e.contactEmail,
      onderwerp: `Morgen: jullie dag in Utrecht (${kortCode(e)})`,
      tekst: `Hoi ${e.contactName.split(' ')[0]},

Morgen is het zover. Hier is alles op een rij.

${programmaTekst(e.inkooporders)}

${heeftKickbike && env('KICKBIKE_INFO') ? `Kickbikes:\n${env('KICKBIKE_INFO')}\n\n` : ''}Meld je bij elk onderdeel onder de naam DagjeUtrecht, referentie ${kortCode(e)}.

Vragen of iets aan de hand op de dag zelf? Bel Ger: ${GER_TELEFOON}.

Veel plezier!
DagjeUtrecht.nl
`,
    });
    if (ok) {
      await prisma.enquiry.update({ where: { id: e.id }, data: { dagInfoOp: new Date() } });
      log.push(`dag-info ${e.id}`);
    }
  }

  return { live: AGENT_LIVE, acties: log };
}
