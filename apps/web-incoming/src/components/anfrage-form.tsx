'use client';

import { useState, useTransition } from 'react';
import { Button } from '@utrecht/ui';
import { sendeAnfrage } from '@/app/actions/anfrage';
import { leseHerkunft } from '@/components/herkunft';

const LEER = { firma: '', name: '', email: '', telefon: '', land: 'DE', zeitraum: '', personen: '', art: '', wuensche: '', website: '' };

export function AnfrageForm() {
  const [form, setForm] = useState(LEER);
  const [fehler, setFehler] = useState<string | null>(null);
  const [fertig, setFertig] = useState(false);
  const [pending, startTransition] = useTransition();
  const set = (k: keyof typeof LEER, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function senden(e: React.FormEvent) {
    e.preventDefault();
    setFehler(null);
    startTransition(async () => {
      const r = await sendeAnfrage({ ...form, herkunft: leseHerkunft() });
      if ('error' in r) setFehler(r.error ?? 'Es ist ein Fehler aufgetreten.');
      else {
        setFertig(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  if (fertig) {
    return (
      <div className="bg-white text-canal-900 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-3">✓</div>
        <h2 className="font-serif text-2xl mb-2">Vielen Dank für Ihre Anfrage</h2>
        <p className="text-canal-700">
          Wir stellen einen Programmvorschlag mit Nettopreisen zusammen und melden uns innerhalb von 2 Werktagen unter{' '}
          <strong>{form.email}</strong>.
        </p>
      </div>
    );
  }

  const feld = 'h-11 w-full rounded-md border border-canal-200 bg-white px-3 text-canal-900';
  const label = 'text-sm text-canal-700 block mb-1';
  return (
    <form onSubmit={senden} className="bg-white text-canal-900 rounded-2xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={label} htmlFor="zeitraum">Reisezeitraum</label>
          <input id="zeitraum" className={feld} placeholder="z. B. Mai 2027, 2 Tage" value={form.zeitraum} onChange={(e) => set('zeitraum', e.target.value)} />
        </div>
        <div>
          <label className={label} htmlFor="personen">Gruppengröße</label>
          <input id="personen" className={feld} inputMode="numeric" placeholder="z. B. 45" value={form.personen} onChange={(e) => set('personen', e.target.value)} />
        </div>
        <div>
          <label className={label} htmlFor="art">Art der Gruppe</label>
          <select id="art" className={feld} value={form.art} onChange={(e) => set('art', e.target.value)}>
            <option value="">Bitte wählen</option>
            <option>Busreise / Rundreise</option>
            <option>Vereins- oder Seniorengruppe</option>
            <option>Schul- oder Studienreise</option>
            <option>Firmenreise / Incentive</option>
            <option>Sonstiges</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="land">Land</label>
          <select id="land" className={feld} value={form.land} onChange={(e) => set('land', e.target.value)}>
            <option value="DE">Deutschland</option>
            <option value="AT">Österreich</option>
            <option value="CH">Schweiz</option>
            <option value="OTHER">Sonstiges</option>
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="wuensche">Ihre Wünsche</label>
        <textarea id="wuensche" className="w-full min-h-[100px] rounded-md border border-canal-200 p-3" placeholder="Programmideen, Budget pro Person, Mittag- oder Abendessen, Übernachtung" value={form.wuensche} onChange={(e) => set('wuensche', e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input aria-label="Firma" required className={feld} placeholder="Firma *" value={form.firma} onChange={(e) => set('firma', e.target.value)} />
        <input aria-label="Ansprechpartner" required className={feld} placeholder="Ansprechpartner *" value={form.name} onChange={(e) => set('name', e.target.value)} />
        <input aria-label="E-Mail" required type="email" className={feld} placeholder="E-Mail *" value={form.email} onChange={(e) => set('email', e.target.value)} />
        <input aria-label="Telefon" type="tel" className={feld} placeholder="Telefon" value={form.telefon} onChange={(e) => set('telefon', e.target.value)} />
      </div>
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => set('website', e.target.value)} />
      <Button type="submit" variant="incoming" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Bitte warten…' : 'Unverbindlich anfragen'}
      </Button>
      {fehler && <p className="text-sm text-red-700">{fehler}</p>}
      <p className="text-xs text-canal-600">
        Unverbindlich. Wir verwenden Ihre Angaben nur zur Bearbeitung Ihrer Anfrage, siehe{' '}
        <a href="/datenschutz" className="underline">Datenschutz</a>.
      </p>
    </form>
  );
}
