'use client';

import { useState, useTransition } from 'react';
import { Button, Input } from '@utrecht/ui';
import { Star } from 'lucide-react';
import { submitReview } from '@/app/actions/review';
import { useRouter } from 'next/navigation';

export function ReviewForm({
  orderId,
  defaultName,
  defaultEmail,
  providers,
}: {
  orderId: string;
  defaultName: string;
  defaultEmail: string;
  providers: Array<{ id: string; name: string }>;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [providerId, setProviderId] = useState(providers[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await submitReview({
        orderId, providerId, rating, title, body, customerName: name, customerEmail: email,
      });
      if ('error' in result) setError(result.error);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-canal-100 shadow-soft p-6 space-y-4">
      {providers.length > 1 && (
        <div>
          <label className="text-sm text-canal-700 block mb-1">Welke leverancier?</label>
          <select
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
            className="h-11 w-full rounded-md border border-canal-200 px-3"
          >
            {providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      )}

      <div>
        <label className="text-sm text-canal-700 block mb-1">Beoordeling</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              className="text-2xl"
              aria-label={`${n} sterren`}
            >
              <Star
                className={`h-7 w-7 ${n <= rating ? 'fill-terracotta text-terracotta' : 'text-canal-200'}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-canal-700 block mb-1">Titel</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bv: Geweldig uitzicht!" />
      </div>

      <div>
        <label className="text-sm text-canal-700 block mb-1">Je verhaal</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full min-h-[120px] rounded-md border border-canal-200 p-3"
          placeholder="Wat vond je leuk? Wat kon beter?"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-canal-700 block mb-1">Naam *</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-canal-700 block mb-1">E-mail (wordt niet gepubliceerd)</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>

      {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={pending || !body}>
        {pending ? 'Versturen…' : 'Verstuur review'}
      </Button>
      <p className="text-xs text-canal-500 text-center">
        We modereren reviews — pakkende, eerlijke feedback wordt zichtbaar binnen 1-2 werkdagen.
      </p>
    </form>
  );
}
