'use client';

import { useState } from 'react';
import { submitEnquiry } from '../app/actions/submit-enquiry';
import type { AudienceSlug } from '../lib/audiences';

const AUDIENCE_DB: Record<AudienceSlug, 'TEAM' | 'STUDENT' | 'SCHOOL' | 'FAMILY' | 'BACHELORETTE'> = {
  teamuitje: 'TEAM',
  studenten: 'STUDENT',
  schoolgroep: 'SCHOOL',
  gezin: 'FAMILY',
  vrijgezel: 'BACHELORETTE',
};

export function AanvraagForm({
  providerSlugs,
  initialPax,
  initialAudience,
}: {
  providerSlugs: string[];
  initialPax: number;
  initialAudience?: AudienceSlug;
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ code: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(fd: FormData) {
    setPending(true);
    setError(null);
    try {
      const r = await submitEnquiry({
        audience: initialAudience ? AUDIENCE_DB[initialAudience] : null,
        contactName: String(fd.get('contactName') || ''),
        contactEmail: String(fd.get('contactEmail') || ''),
        contactPhone: String(fd.get('contactPhone') || '') || undefined,
        companyName: String(fd.get('companyName') || '') || undefined,
        vatNumber: String(fd.get('vatNumber') || '') || undefined,
        requestedDate: String(fd.get('requestedDate') || '') || undefined,
        paxAdults: Number(fd.get('paxAdults') || initialPax),
        paxChildren: Number(fd.get('paxChildren') || 0),
        budgetMinEuro: fd.get('budgetMinEuro') ? Number(fd.get('budgetMinEuro')) : null,
        budgetMaxEuro: fd.get('budgetMaxEuro') ? Number(fd.get('budgetMaxEuro')) : null,
        message: String(fd.get('message') || '') || undefined,
        providerSlugs,
      });
      setResult({ code: r.enquiryCode });
    } catch (e: any) {
      setError(e.message || 'Er ging iets mis bij het versturen');
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-emerald-900">
        <h2 className="font-serif text-2xl mb-2">Bedankt! Je aanvraag is binnen.</h2>
        <p>
          Ons aanvraagnummer voor jullie: <strong>{result.code}</strong>. Je krijgt zo een
          bevestiging in je mailbox. Ger stuurt binnen 48u een vrijblijvende offerte.
        </p>
      </div>
    );
  }

  return (
    <form
      action={onSubmit}
      className="space-y-5 max-w-xl"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-canal-800">Naam</span>
          <input name="contactName" required className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm text-canal-800">E-mail</span>
          <input name="contactEmail" type="email" required className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-canal-800">Telefoon</span>
          <input name="contactPhone" className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm text-canal-800">Bedrijf (optioneel)</span>
          <input name="companyName" className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-canal-800">BTW-nummer (indien factuur op bedrijf)</span>
        <input name="vatNumber" className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
      </label>

      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm text-canal-800">Gewenste datum</span>
          <input name="requestedDate" type="date" className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm text-canal-800">Volwassenen</span>
          <input name="paxAdults" type="number" min={1} defaultValue={initialPax} required className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm text-canal-800">Kinderen</span>
          <input name="paxChildren" type="number" min={0} defaultValue={0} className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-canal-800">Budget vanaf (€ p.p., opt.)</span>
          <input name="budgetMinEuro" type="number" min={0} className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm text-canal-800">Budget max. (€ p.p., opt.)</span>
          <input name="budgetMaxEuro" type="number" min={0} className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-canal-800">Wensen / opmerkingen</span>
        <textarea name="message" rows={4} className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-canal-900 hover:bg-canal-800 text-white px-6 py-3 font-medium disabled:opacity-50"
      >
        {pending ? 'Versturen…' : 'Verstuur aanvraag'}
      </button>
      <p className="text-xs text-canal-500">
        Je aanvraag komt direct bij Ger van DagjeUtrecht. Binnen 48u ontvang je een vrijblijvende offerte.
      </p>
    </form>
  );
}
