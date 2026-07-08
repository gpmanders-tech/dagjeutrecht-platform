'use client';

import { useState, useTransition } from 'react';
import { Button, Input, formatEuro } from '@utrecht/ui';
import { createDraftOrder } from '@/app/actions/checkout';
import { useRouter } from 'next/navigation';

export function BookingForm({
  providerSlug,
  productId,
  providerName,
  unitPriceCents,
  maxParticipants,
  locale,
}: {
  providerSlug: string;
  productId: string;
  providerName: string;
  unitPriceCents: number;
  maxParticipants: number;
  locale: string;
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [participants, setParticipants] = useState(2);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const total = unitPriceCents * participants;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!date) {
      setError('Kies een datum');
      return;
    }
    startTransition(async () => {
      const result = await createDraftOrder({
        providerSlug,
        productId,
        scheduledAt: new Date(`${date}T${time}`).toISOString(),
        participants,
        locale,
      });
      if ('error' in result) setError(result.error);
      else router.push(`/${locale}/checkout/${result.orderId}`);
    });
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-sm text-canal-700 block mb-1">Datum</label>
        <Input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm text-canal-700 block mb-1">Tijd</label>
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div>
        <label className="text-sm text-canal-700 block mb-1">Aantal personen</label>
        <Input
          type="number"
          min={1}
          max={maxParticipants}
          value={participants}
          onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value) || 1))}
        />
      </div>

      {unitPriceCents > 0 && (
        <div className="flex justify-between items-baseline pt-3 border-t border-canal-100">
          <span className="text-canal-700">Totaal</span>
          <span className="font-serif text-xl text-canal-900">{formatEuro(total)}</span>
        </div>
      )}

      {error && <p className="text-sm text-red-700 bg-red-50 rounded p-2">{error}</p>}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Bezig…' : 'Naar checkout'}
      </Button>
      <p className="text-xs text-canal-500 text-center">
        Geen kosten tot je betaalt. Veilige betaling via Mollie.
      </p>
    </form>
  );
}
