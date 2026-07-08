'use client';

import { useState, useTransition } from 'react';
import { Button, Input } from '@utrecht/ui';
import { registerPartner } from '@/app/actions/register';

export function RegistrationForm() {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    vatNumber: '',
    country: 'DE',
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await registerPartner(form);
      if ('error' in result) setError(result.error);
      else setDone(true);
    });
  }

  if (done) {
    return (
      <div className="bg-white text-canal-900 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-3">✓</div>
        <h2 className="font-serif text-2xl mb-2">Danke für Ihre Anfrage</h2>
        <p className="text-canal-700">
          Wir prüfen Ihre Registrierung und melden uns innerhalb von 2 Werktagen unter <strong>{form.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white text-canal-900 rounded-2xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Firmenname *" value={form.companyName} onChange={(v) => set('companyName', v)} required />
        <Field label="Kontaktperson *" value={form.contactName} onChange={(v) => set('contactName', v)} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="E-Mail *" type="email" value={form.email} onChange={(v) => set('email', v)} required />
        <Field label="Telefon" type="tel" value={form.phone} onChange={(v) => set('phone', v)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="USt-Nummer" value={form.vatNumber} onChange={(v) => set('vatNumber', v)} />
        <div>
          <label className="text-sm text-canal-700 block mb-1">Land *</label>
          <select
            className="h-11 w-full rounded-md border border-canal-200 bg-white px-3 text-canal-900"
            value={form.country}
            onChange={(e) => set('country', e.target.value)}
          >
            <option value="DE">Deutschland</option>
            <option value="AT">Österreich</option>
            <option value="CH">Schweiz</option>
            <option value="NL">Niederlande</option>
            <option value="BE">Belgien</option>
            <option value="FR">Frankreich</option>
            <option value="UK">UK</option>
            <option value="OTHER">Sonstiges</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm text-canal-700 block mb-1">Bemerkungen</label>
        <textarea
          className="w-full min-h-[80px] rounded-md border border-canal-200 p-3"
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Welche Art von Reisen? Gruppengrößen? Anzahl Reisen pro Jahr?"
        />
      </div>
      {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}
      <Button type="submit" variant="incoming" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Bitte warten…' : 'Anfrage senden'}
      </Button>
    </form>
  );
}

function Field({ label, value, onChange, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-canal-700 block mb-1">{label}</label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    </div>
  );
}
