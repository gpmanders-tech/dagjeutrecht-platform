'use client';

import { useMemo, useState } from 'react';
import {
  BOUWSTENEN,
  CLUSTERS,
  PAKKETTEN,
  REGELS,
  TIJDVAKKEN,
  controleer,
  formatEuro,
  prijsPerPersoon,
  vindBouwsteen,
  vindPakket,
  type TijdvakId,
} from '../lib/aanbod';
import { submitBoeking } from '../app/actions/submit-boeking';

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

const invoer = 'mt-1 w-full rounded-lg border border-canal-200 px-3 py-2 bg-white';

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
      <div className="max-w-2xl mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-emerald-900">
        <h2 className="font-serif text-3xl mb-3">Bedankt, je aanvraag is binnen</h2>
        <p className="mb-2">
          Aanvraagnummer <strong>{code}</strong>. Je krijgt zo een bevestiging per mail.
        </p>
        <p>
          We controleren de beschikbaarheid bij onze partners en sturen binnen 2 werkdagen een
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
          <h2 className="font-serif text-2xl text-canal-900 mb-1">1. Wanneer en met hoeveel?</h2>
          <p className="text-sm text-canal-600 mb-4">
            Op donderdag, vrijdag of zaterdag, minimaal {REGELS.minDagenVooruit} dagen vooruit. Van{' '}
            {REGELS.minPers} tot {REGELS.maxPers} personen.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-canal-800">Datum</span>
              <input
                type="date"
                min={eersteMogelijkeDatum()}
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                className={invoer}
              />
            </label>
            <label className="block">
              <span className="text-sm text-canal-800">Aantal personen</span>
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
          <h2 className="font-serif text-2xl text-canal-900 mb-1">2. Start met een pakket</h2>
          <p className="text-sm text-canal-600 mb-4">Of sla dit over en kies hieronder zelf per tijdvak.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {PAKKETTEN.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => kiesPakket(p.slug)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  pakket === p.slug
                    ? 'border-terracotta-500 bg-terracotta-50'
                    : 'border-canal-100 bg-white hover:border-canal-300'
                }`}
              >
                <p className="font-medium text-canal-900">
                  {p.emoji} {p.naam}
                </p>
                <p className="text-sm text-canal-600 mt-1">{p.kort}</p>
                <p className="text-sm text-canal-900 mt-2">{formatEuro(prijsPerPersoon(p.blokken))} p.p.</p>
              </button>
            ))}
          </div>
        </section>

        {/* Stap 3 */}
        <section>
          <h2 className="font-serif text-2xl text-canal-900 mb-1">3. Kies per tijdvak</h2>
          <p className="text-sm text-canal-600 mb-4">
            Verplaatsen tussen het centrum en Amelisweerd gaat met de kickbike-tocht.
          </p>
          <div className="space-y-6">
            {TIJDVAKKEN.map((t) => {
              const opties = BOUWSTENEN.filter((b) => b.tijdvakken.includes(t.id));
              const gekozen = blokken[t.id];
              return (
                <fieldset key={t.id}>
                  <legend className="text-sm font-medium text-canal-900 mb-2">
                    {t.naam} <span className="text-canal-500 font-normal">{t.van} tot {t.tot}</span>
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => kiesBlok(t.id, null)}
                      className={`text-left rounded-xl border px-4 py-3 text-sm ${
                        !gekozen
                          ? 'border-terracotta-500 bg-terracotta-50'
                          : 'border-canal-100 bg-white hover:border-canal-300'
                      }`}
                    >
                      <span className="text-canal-700">Niets in dit tijdvak</span>
                    </button>
                    {opties.map((b) => (
                      <button
                        key={b.slug}
                        type="button"
                        onClick={() => kiesBlok(t.id, b.slug)}
                        className={`text-left rounded-xl border px-4 py-3 text-sm ${
                          gekozen === b.slug
                            ? 'border-terracotta-500 bg-terracotta-50'
                            : 'border-canal-100 bg-white hover:border-canal-300'
                        }`}
                      >
                        <span className="flex justify-between gap-2">
                          <span className="font-medium text-canal-900">
                            {b.emoji} {b.naam}
                          </span>
                          <span className="text-canal-900 whitespace-nowrap">{formatEuro(b.verkoopCents)}</span>
                        </span>
                        <span className="block text-canal-500 mt-1">
                          {CLUSTERS[b.cluster].naam} · {b.duur}
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
      <aside className="lg:sticky lg:top-24 rounded-2xl border border-canal-100 bg-cream/60 p-6 space-y-5">
        <div>
          <h2 className="font-serif text-2xl text-canal-900 mb-3">Jullie dag</h2>
          <ul className="space-y-2 text-sm">
            {TIJDVAKKEN.map((t) => {
              const b = vindBouwsteen(blokken[t.id]);
              if (!b) return null;
              return (
                <li key={t.id} className="flex justify-between gap-3">
                  <span>
                    <span className="text-canal-500">{t.van}</span> {b.naam}
                  </span>
                  <span className="whitespace-nowrap">{formatEuro(b.verkoopCents)}</span>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-canal-200 mt-4 pt-3 text-sm space-y-1">
            <p className="flex justify-between">
              <span>Per persoon</span>
              <span>{formatEuro(pp)}</span>
            </p>
            <p className="flex justify-between font-medium text-canal-900 text-base">
              <span>Totaal {personen > 0 ? `(${personen} pers.)` : ''}</span>
              <span>{formatEuro(pp * Math.max(personen, 0))}</span>
            </p>
            <p className="text-xs text-canal-500">Inclusief btw. Vaste prijs, geen verrassingen achteraf.</p>
          </div>
        </div>

        {fouten.length > 0 && (
          <ul className="rounded-xl bg-white border border-amber-200 p-4 text-sm text-amber-800 space-y-1">
            {fouten.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        )}

        <form action={verstuur} className="space-y-3">
          <label className="block">
            <span className="text-sm text-canal-800">Soort groep</span>
            <select name="groep" required className={invoer} defaultValue="TEAM">
              {GROEPEN.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.naam}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-canal-800">Naam</span>
            <input name="naam" required autoComplete="name" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm text-canal-800">E-mail</span>
            <input name="email" type="email" required autoComplete="email" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm text-canal-800">Telefoon (voor op de dag zelf)</span>
            <input name="telefoon" type="tel" required autoComplete="tel" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm text-canal-800">Bedrijf of school (optioneel)</span>
            <input name="bedrijf" autoComplete="organization" className={invoer} />
          </label>
          <label className="block">
            <span className="text-sm text-canal-800">Opmerking (optioneel)</span>
            <textarea name="opmerking" rows={3} maxLength={1000} className={invoer} />
          </label>
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {serverFouten.length > 0 && (
            <ul className="text-sm text-red-700 space-y-1">
              {serverFouten.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={bezig || fouten.length > 0}
            className="w-full rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white px-6 py-3 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {bezig ? 'Versturen...' : 'Aanvraag versturen'}
          </button>
          <p className="text-xs text-canal-500">
            Je betaalt nog niets. We bevestigen binnen 2 werkdagen de beschikbaarheid en sturen dan een
            betaallink. Dieetwensen en maatwerk zijn niet mogelijk.
          </p>
        </form>
      </aside>
    </div>
  );
}
