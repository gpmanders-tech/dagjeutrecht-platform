'use client';

import { useState } from 'react';
import { submitAanvraag } from '../app/actions/submit-aanvraag';

const GROEPEN = [
  { id: 'TEAM', naam: 'Bedrijf of team' },
  { id: 'BACHELORETTE', naam: 'Vrijgezellen of vrienden' },
  { id: 'FAMILY', naam: 'Familie' },
  { id: 'SCHOOL', naam: 'School' },
  { id: 'STUDENT', naam: 'Studenten' },
] as const;

const invoer = 'mt-1 w-full rounded-xl border-2 border-zee-200 bg-white px-3 py-2.5 text-inkt focus:border-zee-500';

/** Kort aanvraagformulier voor een onderwerp op aanvraag: geen programma, geen prijs. */
export function AanvraagKort({ onderwerp, titel }: { onderwerp: string; titel: string }) {
  const [bezig, setBezig] = useState(false);
  const [fouten, setFouten] = useState<string[]>([]);
  const [code, setCode] = useState<string | null>(null);

  async function verstuur(fd: FormData) {
    setBezig(true);
    setFouten([]);
    try {
      const r = await submitAanvraag({
        onderwerp,
        datum: String(fd.get('datum') || '') || undefined,
        personen: Number(fd.get('personen') || 0),
        groep: String(fd.get('groep')) as (typeof GROEPEN)[number]['id'],
        naam: String(fd.get('naam') || ''),
        email: String(fd.get('email') || ''),
        telefoon: String(fd.get('telefoon') || '') || undefined,
        opmerking: String(fd.get('opmerking') || '') || undefined,
        website: String(fd.get('website') || '') || undefined,
      });
      if (r.ok) setCode(r.code);
      else setFouten(r.fouten);
    } catch {
      setFouten(['Er ging iets mis bij het versturen. Probeer het opnieuw of bel 030 227 14 39.']);
    } finally {
      setBezig(false);
    }
  }

  if (code) {
    return (
      <div className="rounded-2xl bg-zee-400 p-8 text-inkt shadow-xl">
        <h2 className="mb-3 text-3xl font-black uppercase">Bedankt, je aanvraag is binnen</h2>
        <p className="mb-2">
          Aanvraagnummer <strong>{code}</strong>. Je krijgt zo een bevestiging per mail.
        </p>
        <p>We sturen je binnen een werkdag een voorstel met een prijs per persoon.</p>
      </div>
    );
  }

  return (
    <form action={verstuur} className="op-donker space-y-4 rounded-2xl bg-inkt p-6 text-white shadow-xl">
      <h2 className="text-3xl font-black uppercase tracking-tight">Vraag {titel.toLowerCase()} aan</h2>
      <p className="text-sm text-zee-100">Vrijblijvend. Je krijgt binnen een werkdag een voorstel met prijs.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-zee-100">Datum (als je die al weet)</span>
          <input name="datum" type="date" className={invoer} />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-zee-100">Aantal personen</span>
          <input name="personen" type="number" min={1} max={500} required className={invoer} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-bold text-zee-100">Wat voor groep?</span>
        <select name="groep" className={invoer} defaultValue="TEAM">
          {GROEPEN.map((g) => (
            <option key={g.id} value={g.id}>
              {g.naam}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-zee-100">Naam</span>
          <input name="naam" required autoComplete="name" className={invoer} />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-zee-100">E-mail</span>
          <input name="email" type="email" required autoComplete="email" className={invoer} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-bold text-zee-100">Telefoon (optioneel)</span>
        <input name="telefoon" type="tel" autoComplete="tel" className={invoer} />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-zee-100">Wensen (optioneel)</span>
        <textarea name="opmerking" rows={3} maxLength={1000} className={invoer} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {fouten.length > 0 && (
        <ul className="space-y-1 rounded-xl bg-white p-3 text-sm font-semibold text-rose-700">
          {fouten.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={bezig}
        className="w-full rounded-full bg-zon-400 px-6 py-3.5 text-lg font-extrabold uppercase tracking-wide text-inkt shadow-lg hover:bg-zon-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {bezig ? 'Versturen...' : 'Aanvraag versturen'}
      </button>
    </form>
  );
}
