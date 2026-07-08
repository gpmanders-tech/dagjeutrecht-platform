'use client';

import { useState, useTransition } from 'react';
import { Button, Input, formatEuro } from '@utrecht/ui';
import { bookHotelStay } from '@/app/actions/book-hotel';

export function HotelBookingForm({
  hotelSlug,
  productId,
  unitPriceCents,
}: {
  hotelSlug: string;
  productId: string;
  unitPriceCents: number;
}) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0;
  const total = unitPriceCents * nights;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (nights < 1) {
      setError('Check-out moet ná check-in zijn.');
      return;
    }
    startTransition(async () => {
      const result = await bookHotelStay({ hotelSlug, productId, checkIn, checkOut, guests, nights });
      if ('error' in result) setError(result.error);
      else window.location.href = `http://localhost:3000/nl/checkout/${result.orderId}`;
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-sm text-canal-700 block mb-1">Check-in *</label>
        <Input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm text-canal-700 block mb-1">Check-out *</label>
        <Input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
      </div>
      <div>
        <label className="text-sm text-canal-700 block mb-1">Gasten</label>
        <Input
          type="number"
          min={1}
          max={6}
          value={guests}
          onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
        />
      </div>
      {nights > 0 && total > 0 && (
        <div className="flex justify-between pt-3 border-t border-canal-100">
          <span className="text-canal-700 text-sm">{nights} nacht{nights > 1 ? 'en' : ''}</span>
          <span className="font-serif text-xl text-canal-900">{formatEuro(total)}</span>
        </div>
      )}
      {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}
      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={pending || !checkIn || !checkOut}>
        {pending ? 'Bezig…' : 'Reserveren'}
      </Button>
      <p className="text-xs text-canal-500 text-center">Beveiligde betaling via UtrechtNow / Mollie</p>
    </form>
  );
}
