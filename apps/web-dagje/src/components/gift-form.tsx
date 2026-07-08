'use client';

import { useState } from 'react';
import { GIFT_OPTIONS } from '../lib/giftcards';
import { submitGiftOrder } from '../app/actions/submit-gift-order';

export function GiftForm({ initialSlug }: { initialSlug?: string }) {
  const [slug, setSlug] = useState(initialSlug ?? 'gift-50');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ code: string } | null>(null);

  const selected = GIFT_OPTIONS.find((g) => g.slug === slug)!;

  async function onSubmit(fd: FormData) {
    setPending(true);
    setError(null);
    try {
      const r = await submitGiftOrder({
        giftSlug: slug,
        buyerName: String(fd.get('buyerName') || ''),
        buyerEmail: String(fd.get('buyerEmail') || ''),
        buyerPhone: String(fd.get('buyerPhone') || '') || undefined,
        recipientName: String(fd.get('recipientName') || ''),
        recipientEmail: String(fd.get('recipientEmail') || '') || undefined,
        personalMessage: String(fd.get('personalMessage') || '') || undefined,
        deliverBy: String(fd.get('deliverBy') || '') || undefined,
      });
      setResult({ code: r.enquiryCode });
    } catch (e: any) {
      setError(e.message || 'Er ging iets mis');
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-emerald-900">
        <h2 className="font-serif text-2xl mb-2">Bedankt! Je bestelling staat.</h2>
        <p>
          Referentie: <strong>{result.code}</strong>. Ger neemt binnen 48u contact op om de betaling
          en bezorging af te stemmen. Bevestigingsmail volgt zo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-sm text-canal-700 mb-3">Kies een cadeaubon:</p>
        <div className="space-y-2">
          {GIFT_OPTIONS.map((g) => (
            <button
              key={g.slug}
              type="button"
              onClick={() => setSlug(g.slug)}
              className={`w-full text-left rounded-xl border p-4 transition-colors ${
                slug === g.slug
                  ? 'border-terracotta-500 bg-terracotta-50'
                  : 'border-canal-200 bg-white hover:border-canal-400'
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-serif text-lg text-canal-900">{g.title}</span>
                <span className="text-canal-800 font-semibold">
                  &euro; {(g.priceCents / 100).toFixed(0)}
                </span>
              </div>
              <p className="text-sm text-canal-600">{g.description}</p>
            </button>
          ))}
        </div>
      </div>

      <form action={onSubmit} className="space-y-4">
        <div className="rounded-2xl bg-canal-50 p-4 text-canal-800 text-sm">
          Gekozen: <strong>{selected.title}</strong> - &euro; {(selected.priceCents / 100).toFixed(0)}
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-canal-800 mb-1">Jouw gegevens</legend>
          <label className="block">
            <span className="text-xs text-canal-600">Naam</span>
            <input name="buyerName" required className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-xs text-canal-600">E-mail</span>
            <input name="buyerEmail" type="email" required className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-xs text-canal-600">Telefoon (optioneel)</span>
            <input name="buyerPhone" className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
          </label>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-canal-800 mb-1">Voor wie is het?</legend>
          <label className="block">
            <span className="text-xs text-canal-600">Naam ontvanger</span>
            <input name="recipientName" required className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-xs text-canal-600">E-mail ontvanger (optioneel, voor digitaal versturen)</span>
            <input name="recipientEmail" type="email" className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-xs text-canal-600">Persoonlijke boodschap (optioneel)</span>
            <textarea name="personalMessage" rows={3} className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-xs text-canal-600">Ontvangen voor (datum)</span>
            <input name="deliverBy" type="date" className="mt-1 w-full rounded-lg border border-canal-200 px-3 py-2" />
          </label>
        </fieldset>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white py-3 font-medium disabled:opacity-50"
        >
          {pending ? 'Versturen...' : `Bestel voor ${'\u20AC'} ${(selected.priceCents / 100).toFixed(0)}`}
        </button>
        <p className="text-xs text-canal-500">
          Ger stuurt binnen 48u een betaalverzoek en zorgt voor de bezorging.
        </p>
      </form>
    </div>
  );
}
