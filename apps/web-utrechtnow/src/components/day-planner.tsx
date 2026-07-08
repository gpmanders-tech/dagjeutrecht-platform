'use client';

import { useState, useTransition } from 'react';
import { Button, Input, formatEuro, providerImageUrl } from '@utrecht/ui';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { createProgramOrder } from '@/app/actions/program';

const CHIPS = [
  'Familie met kinderen',
  'Romantisch',
  'Actief & buiten',
  'Cultureel',
  'Eten & drinken',
  'Op het water',
  'Regenachtige dag',
  'Vrijgezellenfeest',
  'Foodie',
  'Budget',
  'Luxe',
];

type Suggestion = {
  providerSlug: string;
  name: string;
  reason: string;
  time?: string;
  priceCents?: number;
  bookable?: boolean;
};

type ProgramItem = Suggestion & {
  uid: string;
  selected: boolean;
  time: string;
  participants: number;
};

function uid() { return Math.random().toString(36).slice(2, 9); }

export function DayPlanner() {
  const router = useRouter();
  const locale = useLocale();
  const [text, setText] = useState('');
  const [active, setActive] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intro, setIntro] = useState('');
  const [program, setProgram] = useState<ProgramItem[]>([]);
  const [booking, startBooking] = useTransition();

  function toggleChip(chip: string) {
    setActive((a) => (a.includes(chip) ? a.filter((c) => c !== chip) : [...a, chip]));
  }

  async function plan() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, chips: active, budgetEuro: budget ? Number(budget) : null }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setIntro(data.intro ?? '');
      setProgram(
        (data.suggestions ?? []).map((s: Suggestion, i: number): ProgramItem => ({
          ...s,
          uid: uid(),
          selected: s.bookable !== false,
          time: s.time || ['10:00', '12:30', '15:00', '18:00', '20:30'][i] || '12:00',
          participants,
        })),
      );
    } catch (e: any) {
      setError(e.message || 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  }

  function move(uid: string, dir: -1 | 1) {
    setProgram((p) => {
      const idx = p.findIndex((x) => x.uid === uid);
      if (idx < 0) return p;
      const target = idx + dir;
      if (target < 0 || target >= p.length) return p;
      const copy = [...p];
      [copy[idx], copy[target]] = [copy[target]!, copy[idx]!];
      return copy;
    });
  }

  function remove(uid: string) {
    setProgram((p) => p.filter((x) => x.uid !== uid));
  }

  function toggleSelect(uid: string) {
    setProgram((p) => p.map((x) => (x.uid === uid ? { ...x, selected: !x.selected } : x)));
  }

  function setItemTime(uid: string, time: string) {
    setProgram((p) => p.map((x) => (x.uid === uid ? { ...x, time } : x)));
  }

  function setItemParticipants(uid: string, n: number) {
    setProgram((p) => p.map((x) => (x.uid === uid ? { ...x, participants: Math.max(1, n) } : x)));
  }

  const selected = program.filter((x) => x.selected && (x.bookable !== false));
  const total = selected.reduce((sum, x) => sum + (x.priceCents ?? 0) * x.participants, 0);
  const canBook = selected.length > 0 && date;

  function book() {
    setError(null);
    startBooking(async () => {
      const result = await createProgramOrder({
        date,
        locale,
        items: selected.map((s) => ({
          providerSlug: s.providerSlug,
          time: s.time,
          participants: s.participants,
        })),
      });
      if ('error' in result) setError(result.error);
      else router.push(`/${locale}/checkout/${result.orderId}`);
    });
  }

  return (
    <div className="space-y-8">
      {/* Brief-formulier */}
      <div className="bg-white rounded-2xl border border-canal-100 shadow-soft p-6 space-y-4">
        <div>
          <label className="text-sm text-canal-700 block mb-1">Wat zoek je?</label>
          <textarea
            className="w-full min-h-[100px] rounded-md border border-canal-200 p-3 text-canal-900 focus:outline-none focus:ring-2 focus:ring-canal-500"
            placeholder="Bv: dagje met 2 vrienden, half op het water, ergens lunchen aan de gracht, einde van de dag iets bijzonders…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <p className="text-sm text-canal-700 mb-2">Sfeer</p>
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleChip(c)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  active.includes(c)
                    ? 'bg-canal text-white border-canal'
                    : 'bg-white text-canal-700 border-canal-200 hover:border-terracotta-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-canal-700 block mb-1">Budget p.p. (optioneel)</label>
            <Input type="number" placeholder="bv. 75" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-canal-700 block mb-1">Aantal personen</label>
            <Input
              type="number"
              min={1}
              value={participants}
              onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={plan}
              variant="accent"
              size="lg"
              className="w-full"
              disabled={loading || (!text && active.length === 0)}
            >
              {loading ? 'Aan het plannen…' : program.length ? 'Opnieuw plannen' : 'Plan mijn dag'}
            </Button>
          </div>
        </div>
        {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}
      </div>

      {/* Intro */}
      {intro && (
        <div className="bg-canal-50 rounded-2xl p-5 text-canal-800">{intro}</div>
      )}

      {/* Programma-bouwer */}
      {program.length > 0 && (
        <div>
          <div className="flex items-end justify-between mb-3">
            <h2 className="font-serif text-2xl text-canal-900">Jouw programma</h2>
            <div>
              <label className="text-sm text-canal-700 block mb-1">Datum *</label>
              <Input type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <ol className="space-y-3">
            {program.map((item, i) => {
              const isTip = item.bookable === false;
              return (
                <li
                  key={item.uid}
                  className={`bg-white rounded-xl border shadow-soft p-4 flex gap-4 items-start ${
                    item.selected && !isTip ? 'border-terracotta-300' : 'border-canal-100 opacity-70'
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelect(item.uid)}
                    disabled={isTip}
                    className="mt-2 h-5 w-5 rounded"
                    title={isTip ? 'Tip — niet boekbaar' : ''}
                  />

                  {/* Foto */}
                  <img
                    src={providerImageUrl(item.providerSlug, 120, 120)}
                    alt={item.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />

                  {/* Tijd */}
                  <div className="w-20">
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) => setItemTime(item.uid, e.target.value)}
                      disabled={isTip}
                      className="w-full h-9 rounded-md border border-canal-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-canal-500 disabled:bg-canal-50"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-canal-500 uppercase">Stap {i + 1}</span>
                      {isTip && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">💡 Tip</span>}
                    </div>
                    <p className="font-serif text-lg text-canal-900 mt-1">{item.name}</p>
                    <p className="text-sm text-canal-700">{item.reason}</p>
                    {!isTip && (
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <label className="text-canal-700">
                          Pers.{' '}
                          <input
                            type="number"
                            min={1}
                            value={item.participants}
                            onChange={(e) => setItemParticipants(item.uid, parseInt(e.target.value) || 1)}
                            className="w-16 h-8 rounded border border-canal-200 px-1 ml-1"
                          />
                        </label>
                        {item.priceCents != null && item.priceCents > 0 && (
                          <span className="text-canal-900">
                            {formatEuro(item.priceCents)} × {item.participants} ={' '}
                            <strong>{formatEuro(item.priceCents * item.participants)}</strong>
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => move(item.uid, -1)}
                      disabled={i === 0}
                      className="h-7 w-7 rounded border border-canal-200 hover:bg-canal-50 disabled:opacity-30 flex items-center justify-center"
                      aria-label="Omhoog"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => move(item.uid, 1)}
                      disabled={i === program.length - 1}
                      className="h-7 w-7 rounded border border-canal-200 hover:bg-canal-50 disabled:opacity-30 flex items-center justify-center"
                      aria-label="Omlaag"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(item.uid)}
                      className="h-7 w-7 rounded border border-canal-200 hover:bg-red-50 hover:text-red-700 flex items-center justify-center"
                      aria-label="Verwijder"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 bg-canal text-white rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="text-xs text-cream/70 uppercase tracking-wide">{selected.length} onderdelen geselecteerd</p>
              <p className="font-serif text-2xl mt-1">{formatEuro(total)}</p>
            </div>
            <Button onClick={book} variant="accent" size="lg" disabled={!canBook || booking}>
              {booking ? 'Bezig…' : 'Boek dit programma'}
            </Button>
          </div>
          {!date && program.length > 0 && (
            <p className="text-xs text-canal-600 mt-2 text-right">Kies eerst een datum.</p>
          )}
        </div>
      )}
    </div>
  );
}
