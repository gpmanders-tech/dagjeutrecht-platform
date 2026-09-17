'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  BOUWSTENEN,
  CLUSTERS,
  REGELS,
  TIJDVAKKEN,
  controleer,
  buitenSeizoen,
  pakkettenOpSeizoen,
  uitgelichtSeizoen,
  formatEuro,
  prijsPerPersoon,
  vindBouwsteen,
  vindPakket,
  type TijdvakId,
} from '../lib/aanbod';
import { submitBoeking } from '../app/actions/submit-boeking';
import { fotoVoorBouwsteen, fotoVoorPakket } from '../lib/fotos';

const GROEPEN = [
  { id: 'TEAM', naam: 'Bedrijf of team' },
  { id: 'SCHOOL', naam: 'School' },
  { id: 'STUDENT', naam: 'Studenten' },
  { id: 'BACHELORETTE', naam: 'Vrijgezellen of vrienden' },
  { id: 'FAMILY', naam: 'Familie' },
] as const;

function eersteMogelijkeDatum() {
  const d = new Date();
  d.setDate(d.getDate() + REGELS.minDagenVooruit);
  return d.toISOString().slice(0, 10);
}

const invoer = 'mt-1 w-full rounded-xl border-2 border-zee-200 bg-white px-3 py-2.5 text-inkt focus:border-zee-500';
const gekozenStijl = 'border-vlam-400 bg-vlam-50 ring-2 ring-vlam-400';
const openStijl = 'border-inkt/10 bg-white hover:border-zee-400';
const stapKop = 'text-3xl font-black uppercase tracking-tight text-inkt';

export function BoekenFormulier({ startPakket }: { startPakket?: string }) {
  const [pakket, setPakket] = useState<string | undefined>(vindPakket(startPakket)?.slug);
  const [blokken, setBlokken] = useState<Partial<Record<TijdvakId, string>>>(
    vindPakket(startPakket)?.blokken ?? {}
  );
  const [datum, setDatum] = useState('');
  const [personen, setPersonen] = useState(12);
  const [bezig, setBezig] = useState(false);
  const [serverFouten, setServerFouten] = useState<string[]>([]);
  const [code, setCode] = useState<string | null>(null);

  const fouten = useMemo(() => controleer({ datum, personen, blokken }), [datum, personen, blokken]);
  const pp = prijsPerPersoon(blokken);

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
        groep: String(fd.get('groep')) as (typeof GROEPEN)[number]['id'],
        naam: String(fd.get('naam') || ''),
        email: String(fd.get('email') || ''),
        telefoon: String(fd.get('telefoon') || ''),
        bedrijf: String(fd.get('bedrijf') || '') || undefined,
        opmerking: String(fd.get('opmerking') || '') || undefined,
        website: String(fd.get('website') || '') || undefined,
      });
      if (r.ok) setCode(r.code);
      else setServerFouten(r.fouten);
    } catch {
      setServerFouten(['Er ging iets mis bij het versturen. Probeer het opnieuw of bel 030 227 14 39.']);
    } finally {
      setBezig(false);
    }
  }

  if (code) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-zee-400 p-8 text-inkt shadow-xl">
        <h2 className="mb-3 text-4xl font-black uppercase">Bedankt, je aanvraag is binnen</h2>
        <p className="mb-2">
          Aanvraagnummer <strong>{code}</strong>. Je krijgt zo een bevestiging per mail.
        </p>
        <p>
          We controleren de beschikbaarheid bij onze partners en sturen binnen 3 werkdagen een
          bevestiging met betaallink. Pas na betaling is de boeking definitief.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
      <div className="space-y-10">
        {/* Stap 1 */}
        <section>
          <h2 className={`${stapKop} mb-1`}>1. Wanneer en met hoeveel?</h2>
          <p className="mb-5 text-grijs">
            Op donderdag, vrijdag of zaterdag, minimaal {REGELS.minDagenVooruit} dagen vooruit. Vanaf{' '}
            {REGELS.minPers} personen.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-bold text-inkt">Datum</span>
              <input
                type="date"
                min={eersteMogelijkeDatum()}
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                className={invoer}
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-inkt">Aantal personen</span>
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
          <h2 className={`${stapKop} mb-1`}>2. Start met een pakket</h2>
          <p className="mb-5 text-grijs">Of sla dit over en kies hieronder zelf per tijdvak.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {pakkettenOpSeizoen().map((p) => (
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
                      {p.seizoen === 'winter' ? '❄️ Deze winter' : '☀️ Deze zomer'}
                    </span>
                  )}
                  {buitenSeizoen(p) && (
                    <span className="absolute left-2 top-2 rounded-lg bg-white px-2 py-0.5 text-xs font-extrabold uppercase text-inkt shadow">
                      {p.seizoen === 'zomer' ? 'Vanaf april' : 'Vanaf november'}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 rounded-full bg-white px-3 py-1 text-sm font-black text-inkt shadow">
                    {formatEuro(prijsPerPersoon(p.blokken))} p.p.
                  </span>
                </span>
                <span className="block p-4">
                  <span className="block text-lg font-extrabold text-inkt">{p.naam}</span>
                  <span className="mt-1 block text-sm text-grijs">{p.kort}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Stap 3 */}
        <section>
          <h2 className={`${stapKop} mb-1`}>3. Kies per tijdvak</h2>
          <p className="mb-5 text-grijs">
            Verplaatsen tussen het centrum en Amelisweerd gaat met de kickbike-tocht.
          </p>
          <div className="space-y-6">
            {TIJDVAKKEN.map((t) => {
              const opties = BOUWSTENEN.filter((b) => b.tijdvakken.includes(t.id));
              const gekozen = blokken[t.id];
              return (
                <fieldset key={t.id}>
                  <legend className="mb-3 flex items-center gap-3">
                    <span className="rounded-lg bg-zee-400 px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-inkt">{t.naam}</span>
                    <span className="font-bold text-grijs">
                      {t.van} tot {t.tot}
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
                      Niets in dit tijdvak
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
                            <span className="font-extrabold text-inkt">{b.naam}</span>
                            <span className="whitespace-nowrap font-black text-inkt">{formatEuro(b.verkoopCents)}</span>
                          </span>
                          <span className="mt-0.5 block text-grijs">
                            {b.cluster === 'beide' ? 'Onderweg' : CLUSTERS[b.cluster].naam} · {b.duur}
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
          <h2 className="mb-3 text-3xl font-black uppercase tracking-tight text-zon-300">Jullie dag</h2>
          <ul className="space-y-2 text-sm">
            {TIJDVAKKEN.map((t) => {
              const b = vindBouwsteen(blokken[t.id]);
              if (!b) return null;
              return (
                <li key={t.id} className="flex justify-between gap-3">
                  <span>
                    <span className="font-bold text-zee-300">{t.van}</span> {b.naam}
                  </span>
                  <span className="whitespace-nowrap">{formatEuro(b.verkoopCents)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 space-y-1 border-t border-inkt-700 pt-3 text-sm">
            <p className="flex justify-between">
              <span>Per persoon</span>
              <span>{formatEuro(pp)}</span>
            </p>
            <p className="flex justify-between text-2xl font-black text-white">
              <span>Totaal {personen > 0 ? `(${personen} pers.)` : ''}</span>
              <span>{formatEuro(pp * Math.max(personen, 0))}</span>
            </p>
            <p className="text-xs text-zee-200">Inclusief btw. Vaste prijs, geen verrassingen achteraf.</p>
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
            <span className="text-sm font-bold text-zee-100">Soort groep</span>
            <select name="groep" required className={invoer} defaultValue="TEAM">
              {GROEPEN.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.naam}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">Naam</span>
            <input name="naam" required autoComplete="name" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">E-mail</span>
            <input name="email" type="email" required autoComplete="email" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">Telefoon (voor op de dag zelf)</span>
            <input name="telefoon" type="tel" required autoComplete="tel" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">Bedrijf of school (optioneel)</span>
            <input name="bedrijf" autoComplete="organization" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-zee-100">Opmerking (optioneel)</span>
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
            {bezig ? 'Versturen...' : 'Aanvraag versturen'}
          </button>
          <p className="text-xs text-zee-200">
            Je betaalt nog niets. We bevestigen binnen 3 werkdagen de beschikbaarheid en sturen dan een
            betaallink. Dieetwensen en maatwerk zijn niet mogelijk.
          </p>
        </form>
      </aside>
    </div>
  );
}
