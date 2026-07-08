'use client';

import { useState, useEffect } from 'react';
import { AUDIENCES, type AudienceSlug } from '../lib/audiences';

type Suggestion = {
  providerSlug: string;
  name: string;
  time?: string;
  reason: string;
  priceCents: number;
  bookable: boolean;
  heroImage?: string;
  durationMinutes?: number;
};

export type InitialSuggestion = {
  providerSlug: string;
  name: string;
  priceCents: number;
  reason?: string;
  heroImage?: string;
  bookable: boolean;
};

type PlanResp = { intro: string; suggestions: Suggestion[] };

const SEASONS = [
  { slug: 'lente', label: 'Lente', months: 'mrt-mei' },
  { slug: 'zomer', label: 'Zomer', months: 'jun-aug' },
  { slug: 'herfst', label: 'Herfst', months: 'sep-nov' },
  { slug: 'winter', label: 'Winter', months: 'dec-feb' },
  { slug: 'kerst', label: 'Kerst/oud & nieuw', months: 'dec' },
  { slug: 'zomervakantie', label: 'Zomervakantie', months: 'jul-aug' },
] as const;

type SeasonSlug = typeof SEASONS[number]['slug'];

export function Samensteller({
  initialAudience,
  initialSuggestions = [],
}: {
  initialAudience?: AudienceSlug;
  initialSuggestions?: InitialSuggestion[];
}) {
  const [audience, setAudience] = useState<AudienceSlug | ''>(initialAudience ?? '');
  const [season, setSeason] = useState<SeasonSlug | ''>('');
  const [pax, setPax] = useState(10);
  const [budget, setBudget] = useState<number | ''>('');
  const [chips, setChips] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [plan, setPlan] = useState<PlanResp | null>(
    initialSuggestions.length
      ? {
          intro: 'Toegevoegd vanaf de activiteiten-pagina - pas naar wens aan of laat AI aanvullen.',
          suggestions: initialSuggestions.map((s) => ({
            providerSlug: s.providerSlug,
            name: s.name,
            priceCents: s.priceCents,
            reason: s.reason ?? 'Handmatig toegevoegd',
            bookable: s.bookable,
            heroImage: s.heroImage,
          })),
        }
      : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audienceObj = audience ? AUDIENCES.find((a) => a.slug === audience) : null;

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audience: audienceObj?.db ?? null,
          season: season || null,
          text,
          chips,
          budgetEuro: budget === '' ? null : Number(budget),
          pax,
        }),
      });
      if (!res.ok) throw new Error('AI-oproep mislukt');
      const data: PlanResp = await res.json();
      setPlan(data);
    } catch (e: any) {
      setError(e.message || 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  }

  function removeSuggestion(slug: string) {
    if (!plan) return;
    setPlan({ ...plan, suggestions: plan.suggestions.filter((s) => s.providerSlug !== slug) });
  }

  function move(slug: string, dir: -1 | 1) {
    if (!plan) return;
    const idx = plan.suggestions.findIndex((s) => s.providerSlug === slug);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= plan.suggestions.length) return;
    const next = [...plan.suggestions];
    [next[idx], next[j]] = [next[j], next[idx]];
    setPlan({ ...plan, suggestions: next });
  }

  // === Chat-integratie: state emitten + acties toepassen ===
  useEffect(() => {
    const slugs = plan?.suggestions.map((s) => s.providerSlug) ?? [];
    window.dispatchEvent(
      new CustomEvent('dagje-samensteller-state', {
        detail: { slugs, pax, audience: audienceObj?.db ?? null, season: season || null },
      })
    );
  }, [plan, pax, audienceObj, season]);

  useEffect(() => {
    async function handleApply(e: Event) {
      const detail = (e as CustomEvent).detail as {
        actions: Array<
          | { type: 'add'; providerSlug: string; name: string; priceCents: number; time?: string; reason?: string }
          | { type: 'remove'; providerSlug: string }
          | { type: 'setTime'; providerSlug: string; time: string }
          | { type: 'setPax'; pax: number }
          | { type: 'clear' }
        >;
      };
      if (!detail?.actions?.length) return;

      let nextPlan: PlanResp | null = plan
        ? { ...plan, suggestions: [...plan.suggestions] }
        : { intro: 'Programma bijgewerkt via chat.', suggestions: [] };

      for (const a of detail.actions) {
        if (a.type === 'add') {
          if (nextPlan.suggestions.some((s) => s.providerSlug === a.providerSlug)) continue;
          nextPlan.suggestions.push({
            providerSlug: a.providerSlug,
            name: a.name,
            priceCents: a.priceCents,
            time: a.time,
            reason: a.reason ?? 'Toegevoegd via chat',
            bookable: true,
          });
        } else if (a.type === 'remove') {
          nextPlan.suggestions = nextPlan.suggestions.filter(
            (s) => s.providerSlug !== a.providerSlug
          );
        } else if (a.type === 'setTime') {
          nextPlan.suggestions = nextPlan.suggestions.map((s) =>
            s.providerSlug === a.providerSlug ? { ...s, time: a.time } : s
          );
        } else if (a.type === 'setPax') {
          setPax(a.pax);
        } else if (a.type === 'clear') {
          nextPlan.suggestions = [];
        }
      }
      setPlan(nextPlan);
    }
    window.addEventListener('dagje-samensteller-apply', handleApply);
    return () => window.removeEventListener('dagje-samensteller-apply', handleApply);
  }, [plan]);

  const totalPerPerson = plan?.suggestions.reduce((s, x) => s + x.priceCents, 0) ?? 0;
  const totalAll = totalPerPerson * pax;

  const chipOptions = ['Actief', 'Culinair', 'Cultuur', 'Kindvriendelijk', 'Feestje', 'Rustig'];

  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
      <aside className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-canal-800 mb-2">Type groep</label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as AudienceSlug | '')}
            className="w-full rounded-lg border border-canal-200 px-3 py-2 bg-white"
          >
            <option value="">- kies je groep -</option>
            {AUDIENCES.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.title}
              </option>
            ))}
          </select>
        </div>

        {audience && (
          <div>
            <label className="block text-sm font-medium text-canal-800 mb-2">
              Jaargetijde / thema (optioneel)
            </label>
            <div className="flex flex-wrap gap-2">
              {SEASONS.map((s) => {
                const active = season === s.slug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setSeason(active ? '' : s.slug)}
                    className={`rounded-full px-3 py-1 text-sm border ${
                      active
                        ? 'bg-canal-900 text-white border-canal-900'
                        : 'bg-white text-canal-700 border-canal-200'
                    }`}
                    title={s.months}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-canal-800 mb-2">Aantal personen</label>
          <input
            type="number"
            value={pax}
            onChange={(e) => setPax(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-canal-200 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-canal-800 mb-2">
            Budget p.p. (€, optioneel)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="bv. 50"
            className="w-full rounded-lg border border-canal-200 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-canal-800 mb-2">Sfeer</label>
          <div className="flex flex-wrap gap-2">
            {chipOptions.map((c) => {
              const active = chips.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() =>
                    setChips(active ? chips.filter((x) => x !== c) : [...chips, c])
                  }
                  className={`rounded-full px-3 py-1 text-sm border ${
                    active
                      ? 'bg-terracotta-500 text-white border-terracotta-500'
                      : 'bg-white text-canal-700 border-canal-200'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-canal-800 mb-2">
            Extra wensen (optioneel)
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="bv. we willen graag beginnen met een borrel, iemand met een rolstoel..."
            className="w-full rounded-lg border border-canal-200 px-3 py-2"
          />
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="w-full rounded-full bg-canal-900 hover:bg-canal-800 text-white py-3 font-medium disabled:opacity-50"
        >
          {loading ? 'Even denken…' : plan ? 'Nieuwe suggestie ophalen' : 'Stel mijn dag samen'}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </aside>

      <section>
        {!plan ? (
          <div className="rounded-2xl bg-cream/40 p-8 text-canal-800">
            <h3 className="font-serif text-2xl mb-3">Klaar voor je dag Utrecht?</h3>
            <p>
              Vul links jullie voorkeuren in en klik op <em>Stel mijn dag samen</em>. Je krijgt
              direct 3-5 activiteiten in een logische volgorde. Alles pas je zelf nog aan.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl bg-cream/40 p-6 text-canal-800 mb-6">
              <p>{plan.intro}</p>
            </div>

            <ol className="space-y-4">
              {plan.suggestions.map((s, i) => (
                <li
                  key={s.providerSlug}
                  className="bg-white rounded-2xl border border-canal-100 p-5 flex gap-4"
                >
                  <img
                    src={
                      s.heroImage ??
                      `https://picsum.photos/seed/${encodeURIComponent(s.providerSlug)}/400/300`
                    }
                    alt={s.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0 bg-cream"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-canal-500 uppercase">{s.time ?? `Stop ${i + 1}`}</p>
                        <h4 className="font-serif text-xl text-canal-900">{s.name}</h4>
                        <p className="text-canal-700 text-sm mt-1">{s.reason}</p>
                      </div>
                      <p className="text-canal-900 font-semibold whitespace-nowrap">
                        €{(s.priceCents / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => move(s.providerSlug, -1)}
                        className="text-xs text-canal-600 hover:text-canal-900"
                      >
                        ↑ eerder
                      </button>
                      <button
                        onClick={() => move(s.providerSlug, 1)}
                        className="text-xs text-canal-600 hover:text-canal-900"
                      >
                        ↓ later
                      </button>
                      <button
                        onClick={() => removeSuggestion(s.providerSlug)}
                        className="text-xs text-red-600 hover:text-red-800 ml-auto"
                      >
                        verwijder
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {plan.suggestions.length > 0 && (
              <div className="mt-8 rounded-2xl bg-canal-900 text-white p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p className="text-cream/70 text-sm">Indicatie totaalprijs</p>
                    <p className="font-serif text-3xl">
                      €{(totalAll / 100).toFixed(0)}{' '}
                      <span className="text-base text-cream/70">
                        ({(totalPerPerson / 100).toFixed(0)} p.p. × {pax})
                      </span>
                    </p>
                  </div>
                  <a
                    href={`/aanvraag?slugs=${plan.suggestions.map((s) => s.providerSlug).join(',')}&pax=${pax}${audience ? `&doelgroep=${audience}` : ''}`}
                    className="rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium"
                  >
                    Vraag aan Ger →
                  </a>
                </div>
                <p className="text-xs text-cream/60 mt-3">
                  Handmatig ingekocht. Ger stuurt binnen 48u een vrijblijvende offerte.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
