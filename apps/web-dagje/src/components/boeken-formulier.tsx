'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  BOUWSTENEN,
  CLUSTERS,
  REGELS,
  TIJDVAKKEN,
  controleer,
  controleerKeuze,
  buitenSeizoen,
  pakkettenOpSeizoen,
  uitgelichtSeizoen,
  formatEuro,
  prijsPerPersoon,
  vindBouwsteen,
  vindPakket,
  type Bouwsteen,
  type TijdvakId,
} from '../lib/aanbod';
import { submitBoeking } from '../app/actions/submit-boeking';
import { fotoVoorBouwsteen, fotoVoorPakket } from '../lib/fotos';
import { foutTekstMet } from '../lib/i18n/fouten';
import { formatPrijs } from '../lib/i18n/opmaak';
import type { FormulierNamen, FormulierTekst } from '../lib/i18n/types';
import { vul } from '../lib/i18n/vul';
import type { Vertaald } from '../lib/talen';

const GROEP_IDS = ['TEAM', 'SCHOOL', 'STUDENT', 'BACHELORETTE', 'FAMILY'] as const;

/**
 * De Nederlandse teksten van het formulier. De Engelse en Duitse komen als prop
 * mee (lib/i18n/ui-en.ts en ui-de.ts), samen met de vertaalde namen uit het aanbod.
 */
const NL: FormulierTekst = {
  groepen: {
    TEAM: 'Bedrijf of team',
    SCHOOL: 'School',
    STUDENT: 'Studenten',
    BACHELORETTE: 'Vrijgezellen of vrienden',
    FAMILY: 'Familie',
  },
  stap1Kop: '1. Wanneer en met hoeveel?',
  stap1Uitleg: 'Op donderdag, vrijdag of zaterdag, minimaal {dagen} dagen vooruit. Vanaf {min} personen.',
  datum: 'Datum',
  personen: 'Aantal personen',
  stap2Kop: '2. Start met een pakket',
  stap2Uitleg: 'Of sla dit over en kies hieronder zelf per tijdvak.',
  dezeWinter: '❄️ Deze winter',
  dezeZomer: '☀️ Deze zomer',
  vanafApril: 'Vanaf april',
  vanafNovember: 'Vanaf november',
  pp: 'p.p.',
  stap3Kop: '3. Kies per tijdvak',
  stap3Uitleg: 'Verplaatsen tussen het centrum en Amelisweerd gaat met de kickbike-tocht.',
  tot: 'tot',
  nietsInTijdvak: 'Niets in dit tijdvak',
  jullieDag: 'Jullie dag',
  perPersoon: 'Per persoon',
  totaal: 'Totaal ({n} pers.)',
  totaalZonder: 'Totaal',
  inclusiefBtw: 'Inclusief btw. Vaste prijs, geen verrassingen achteraf.',
  soortGroep: 'Soort groep',
  naam: 'Naam',
  email: 'E-mail',
  telefoon: 'Telefoon (voor op de dag zelf)',
  bedrijf: 'Bedrijf of school (optioneel)',
  opmerking: 'Opmerking (optioneel)',
  versturen: 'Aanvraag versturen',
  bezig: 'Versturen...',
  kleineletters:
    'Je betaalt nog niets. We bevestigen binnen 3 werkdagen de beschikbaarheid en sturen dan een betaallink. Dieetwensen kun je doorgeven bij de opmerking. Maatwerk is niet mogelijk.',
  foutVersturen: 'Er ging iets mis bij het versturen. Probeer het opnieuw of bel 030 227 14 39.',
  bedanktKop: 'Bedankt, je aanvraag is binnen',
  bedanktNummer: 'Aanvraagnummer {code}. Je krijgt zo een bevestiging per mail.',
  bedanktTekst:
    'We controleren de beschikbaarheid bij onze partners en sturen binnen 3 werkdagen een bevestiging met betaallink. Pas na betaling is de boeking definitief.',
  // De Nederlandse foutzinnen komen uit controleer() in aanbod.ts.
  fouten: {
    'geen-datum': '',
    'verkeerde-dag': '',
    'te-kort-vooruit': '',
    aantal: '',
    'onbekend-onderdeel': '',
    'geen-activiteit': '',
    'verkeerd-tijdvak': '',
    'aantal-blok': '',
    seizoen: '',
    'kickbike-nodig': '',
    'te-veel-wissels': '',
  },
  veldFouten: { naam: '', email: '', telefoon: '', algemeen: '' },
};

function eersteMogelijkeDatum() {
  const d = new Date();
  d.setDate(d.getDate() + REGELS.minDagenVooruit);
  return d.toISOString().slice(0, 10);
}

const invoer = 'mt-1 w-full rounded-xl border-2 border-zee-200 bg-white px-3 py-2.5 text-inkt focus:border-zee-500';
const gekozenStijl = 'border-vlam-400 bg-vlam-50 ring-2 ring-vlam-400';
const openStijl = 'border-inkt/10 bg-white hover:border-zee-400';
const stapKop = 'text-3xl font-black uppercase tracking-tight text-inkt';

/**
 * Zonder taal: het Nederlandse formulier zoals het altijd was.
 * Met taal, tekst en namen: hetzelfde formulier in het Engels of Duits. De keuzes,
 * prijzen en controles zijn identiek; alleen de woorden verschillen.
 */
export function BoekenFormulier({
  startPakket,
  taal,
  tekst,
  namen,
}: {
  startPakket?: string;
  taal?: Vertaald;
  tekst?: FormulierTekst;
  namen?: FormulierNamen;
}) {
  const vertaald = Boolean(taal && tekst && namen);
  const T = vertaald ? tekst! : NL;
  const [pakket, setPakket] = useState<string | undefined>(vindPakket(startPakket)?.slug);
  const [blokken, setBlokken] = useState<Partial<Record<TijdvakId, string>>>(
    vindPakket(startPakket)?.blokken ?? {}
  );
  const [datum, setDatum] = useState('');
  const [personen, setPersonen] = useState(12);
  const [bezig, setBezig] = useState(false);
  const [serverFouten, setServerFouten] = useState<string[]>([]);
  const [code, setCode] = useState<string | null>(null);

  const fouten = useMemo(() => {
    const keuze = { datum, personen, blokken };
    if (!vertaald) return controleer(keuze);
    return [...new Set(controleerKeuze(keuze).map((f) => foutTekstMet(tekst!.fouten, namen!, f)))];
  }, [datum, personen, blokken, vertaald, tekst, namen]);
  const pp = prijsPerPersoon(blokken);

  const euro = (cents: number) => (vertaald ? formatPrijs(taal!, cents) : formatEuro(cents));
  const blokNaam = (b: Bouwsteen) => (vertaald ? namen!.bouwstenen[b.slug]?.naam ?? b.naam : b.naam);
  const blokDuur = (b: Bouwsteen) => (vertaald ? namen!.bouwstenen[b.slug]?.duur ?? b.duur : b.duur);
  const clusterNaam = (b: Bouwsteen) =>
    vertaald
      ? b.cluster === 'beide'
        ? namen!.onderweg
        : namen!.clusters[b.cluster]
      : b.cluster === 'beide'
        ? 'Onderweg'
        : CLUSTERS[b.cluster].naam;
  const tijdvakNaam = (t: (typeof TIJDVAKKEN)[number]) => (vertaald ? namen!.tijdvakken[t.id] : t.naam);
  // In het Engels en Duits alleen wat vertaald is; in het Nederlands alles.
  const pakketten = pakkettenOpSeizoen().filter((p) => !vertaald || namen!.pakketten[p.slug]);
  const bouwstenen = BOUWSTENEN.filter((b) => !vertaald || namen!.bouwstenen[b.slug]);

  function kiesPakket(slug: string) {
    const p = vindPakket(slug);
    if (!p) return;
    setPakket(p.slug);
    setBlokken(p.blokken);
  }

  function kiesBlok(tijdvak: TijdvakId, slug: string | null) {
    setPakket(undefined);
    setBlokken((huidig) => {
      const nieuw = { ...huidig };
      if (slug) nieuw[tijdvak] = slug;
      else delete nieuw[tijdvak];
      return nieuw;
    });
  }

  async function verstuur(fd: FormData) {
    setBezig(true);
    setServerFouten([]);
    try {
      const r = await submitBoeking({
        datum,
        personen,
        blokken: blokken as Record<string, string>,
        pakket,
        groep: String(fd.get('groep')) as (typeof GROEP_IDS)[number],
        naam: String(fd.get('naam') || ''),
        email: String(fd.get('email') || ''),
        telefoon: String(fd.get('telefoon') || ''),
        bedrijf: String(fd.get('bedrijf') || '') || undefined,
        opmerking: String(fd.get('opmerking') || '') || undefined,
        website: String(fd.get('website') || '') || undefined,
        ...(vertaald ? { taal } : {}),
      });
      if (r.ok) setCode(r.code);
      else setServerFouten(r.fouten);
    } catch {
      setServerFouten([T.foutVersturen]);
    } finally {
      setBezig(false);
    }
  }

  if (code) {
    const [voor, na] = T.bedanktNummer.split('{code}');
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-zee-400 p-8 text-inkt shadow-xl">
        <h2 className="mb-3 text-4xl font-black uppercase">{T.bedanktKop}</h2>
        <p className="mb-2">
          {voor}
          <strong>{code}</strong>
          {na}
        </p>
        <p>{T.bedanktTekst}</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
      <div className="space-y-10">
        {/* Stap 1 */}
        <section>
          <h2 className={`${stapKop} mb-1`}>{T.stap1Kop}</h2>
          <p className="mb-5 text-grijs">{vul(T.stap1Uitleg, { dagen: REGELS.minDagenVooruit, min: REGELS.minPers })}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-bold text-inkt">{T.datum}</span>
              <input
                type="date"
                min={eersteMogelijkeDatum()}
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                className={invoer}
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-inkt">{T.personen}</span>
              <input
                type="number"
                min={REGELS.minPers}
                max={REGELS.maxPers}
                value={personen}
                onChange={(e) => setPersonen(Number(e.target.value))}
                className={invoer}
              />
            </label>
          </div>
        </section>

        {/* Stap 2 */}
        <section>
          <h2 className={`${stapKop} mb-1`}>{T.stap2Kop}</h2>
          <p className="mb-5 text-grijs">{T.stap2Uitleg}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {pakketten.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => kiesPakket(p.slug)}
                className={`overflow-hidden rounded-2xl border-2 text-left shadow-md transition-all hover:-translate-y-0.5 ${
                  pakket === p.slug ? gekozenStijl : openStijl
                }`}
              >
                <span className="relative block aspect-[16/9]">
                  <Image src={fotoVoorPakket(p.slug).src} alt="" fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
                  {p.seizoen === uitgelichtSeizoen() && (
                    <span className="absolute left-2 top-2 rounded-lg bg-zee-400 px-2 py-0.5 text-xs font-extrabold uppercase text-inkt shadow">
                      {p.seizoen === 'winter' ? T.dezeWinter : T.dezeZomer}
                    </span>
                  )}
                  {buitenSeizoen(p) && (
                    <span className="absolute left-2 top-2 rounded-lg bg-white px-2 py-0.5 text-xs font-extrabold uppercase text-inkt shadow">
                      {p.seizoen === 'zomer' ? T.vanafApril : T.vanafNovember}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 rounded-full bg-white px-3 py-1 text-sm font-black text-inkt shadow">
                    {euro(prijsPerPersoon(p.blokken))} {T.pp}
                  </span>
                </span>
                <span className="block p-4">
                  <span className="block text-lg font-extrabold text-inkt">{vertaald ? namen!.pakketten[p.slug]!.naam : p.naam}</span>
                  <span className="mt-1 block text-sm text-grijs">{vertaald ? namen!.pakketten[p.slug]!.kort : p.kort}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Stap 3 */}
        <section>
          <h2 className={`${stapKop} mb-1`}>{T.stap3Kop}</h2>
          <p className="mb-5 text-grijs">{T.stap3Uitleg}</p>
          <div className="space-y-6">
            {TIJDVAKKEN.map((t) => {
              const opties = bouwstenen.filter((b) => b.tijdvakken.includes(t.id));
              const gekozen = blokken[t.id];
              return (
                <fieldset key={t.id}>
                  <legend className="mb-3 flex items-center gap-3">
                    <span className="rounded-lg bg-zee-400 px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-inkt">{tijdvakNaam(t)}</span>
                    <span className="font-bold text-grijs">
                      {t.van} {T.tot} {t.tot}
                    </span>
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => kiesBlok(t.id, null)}
                      className={`flex min-h-[4.5rem] items-center justify-center rounded-xl border-2 border-dashed px-4 py-3 text-sm font-bold ${
                        !gekozen ? gekozenStijl : 'border-inkt/15 bg-white text-grijs hover:border-zee-400'
                      }`}
                    >
                      {T.nietsInTijdvak}
                    </button>
                    {opties.map((b) => (
                      <button
                        key={b.slug}
                        type="button"
                        onClick={() => kiesBlok(t.id, b.slug)}
                        className={`flex items-center gap-3 overflow-hidden rounded-xl border-2 p-2 pr-3 text-left text-sm transition-all ${
                          gekozen === b.slug ? gekozenStijl : openStijl
                        }`}
                      >
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                          <Image src={fotoVoorBouwsteen(b.slug).src} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex justify-between gap-2">
                            <span className="font-extrabold text-inkt">{blokNaam(b)}</span>
                            <span className="whitespace-nowrap font-black text-inkt">{euro(b.verkoopCents)}</span>
                          </span>
                          <span className="mt-0.5 block text-grijs">
                            {clusterNaam(b)} · {blokDuur(b)}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>
        </section>
      </div>

      {/* Overzicht en gegevens */}
      <aside className="op-donker space-y-5 rounded-2xl bg-inkt p-6 text-white shadow-xl lg:sticky lg:top-24">
        <div>
          <h2 className="mb-3 text-3xl font-black uppercase tracking-tight text-zon-300">{T.jullieDag}</h2>
          <ul className="space-y-2 text-sm">
            {TIJDVAKKEN.map((t) => {
              const b = vindBouwsteen(blokken[t.id]);
              if (!b) return null;
              return (
                <li key={t.id} className="flex justify-between gap-3">
                  <span>
                    <span className="font-bold text-zee-300">{t.van}</span> {blokNaam(b)}
                  </span>
                  <span className="whitespace-nowrap">{euro(b.verkoopCents)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 space-y-1 border-t border-inkt-700 pt-3 text-sm">
            <p className="flex justify-between">
              <span>{T.perPersoon}</span>
              <span>{euro(pp)}</span>
            </p>
            <p className="flex justify-between text-2xl font-black text-white">
              <span>{personen > 0 ? vul(T.totaal, { n: personen }) : `${T.totaalZonder} `}</span>
              <span>{euro(pp * Math.max(personen, 0))}</span>
            </p>
            <p className="text-xs text-zee-200">{T.inclusiefBtw}</p>
          </div>
        </div>

        {fouten.length > 0 && (
          <ul className="space-y-1 rounded-xl bg-zon-300 p-4 text-sm font-semibold text-inkt">
            {fouten.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        )}

        <form action={verstuur} className="space-y-3">
          <label className="block">
            <span className="text-sm font-bold text-zee-100">{T.soortGroep}</span>
            <select name="groep" required className={invoer} defaultValue="TEAM">
              {GROEP_IDS.map((id) => (
                <option key={id} value={id}>
                  {T.groepen[id]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">{T.naam}</span>
            <input name="naam" required autoComplete="name" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">{T.email}</span>
            <input name="email" type="email" required autoComplete="email" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">{T.telefoon}</span>
            <input name="telefoon" type="tel" required autoComplete="tel" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">{T.bedrijf}</span>
            <input name="bedrijf" autoComplete="organization" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">{T.opmerking}</span>
            <textarea name="opmerking" rows={3} maxLength={1000} className={invoer} />
          </label>
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {serverFouten.length > 0 && (
            <ul className="space-y-1 rounded-xl bg-white p-3 text-sm font-semibold text-rose-700">
              {serverFouten.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={bezig || fouten.length > 0}
            className="w-full rounded-full bg-zon-400 px-6 py-3.5 text-lg font-extrabold uppercase tracking-wide text-inkt shadow-lg hover:bg-zon-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {bezig ? T.bezig : T.versturen}
          </button>
          <p className="text-xs text-zee-200">{T.kleineletters}</p>
        </form>
      </aside>
    </div>
  );
}
