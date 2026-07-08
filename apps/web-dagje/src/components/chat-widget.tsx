'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

type Message = { role: 'assistant' | 'user'; content: string };
type Suggestion = { providerSlug: string; name: string; priceCents: number; reason?: string };
type ChatAction =
  | { type: 'add'; providerSlug: string; name: string; priceCents: number; time?: string; reason?: string }
  | { type: 'remove'; providerSlug: string }
  | { type: 'setTime'; providerSlug: string; time: string }
  | { type: 'setPax'; pax: number }
  | { type: 'clear' };

type SamenstellerState = {
  slugs: string[];
  pax: number;
  audience: string | null;
  season: string | null;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hoi! Ik denk graag mee. Sta je op de samensteller, dan kan ik ook direct plekken toevoegen of eruit halen. Vertel eens wat je zoekt?',
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const stateRef = useRef<SamenstellerState | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Luister naar samensteller-state (wordt geëmit door <Samensteller>)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as SamenstellerState;
      if (detail) stateRef.current = detail;
    };
    window.addEventListener('dagje-samensteller-state', handler);
    return () => window.removeEventListener('dagje-samensteller-state', handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, suggestions]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setBusy(true);
    setMessages((m) => [...m, { role: 'user', content: text }]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: text,
          state: stateRef.current ?? undefined,
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || '…' }]);
      if (Array.isArray(data.suggestions) && data.suggestions.length) {
        setSuggestions(data.suggestions);
      }
      if (Array.isArray(data.actions) && data.actions.length) {
        window.dispatchEvent(
          new CustomEvent('dagje-samensteller-apply', { detail: { actions: data.actions as ChatAction[] } })
        );
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Sorry, er ging iets mis. Probeer het over een minuutje opnieuw.',
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function addSuggestion(s: Suggestion) {
    window.dispatchEvent(
      new CustomEvent('dagje-samensteller-apply', {
        detail: {
          actions: [
            {
              type: 'add',
              providerSlug: s.providerSlug,
              name: s.name,
              priceCents: s.priceCents,
              reason: s.reason,
            },
          ],
        },
      })
    );
    setSuggestions((cur) => cur.filter((x) => x.providerSlug !== s.providerSlug));
  }

  const pathname = usePathname();
  const onSamensteller = pathname === '/samensteller';

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat openen"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white shadow-xl px-5 py-3 font-medium flex items-center gap-2"
        >
          <span aria-hidden="true">💬</span>
          <span className="hidden sm:inline">Vraag Utrecht</span>
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-canal-200 flex flex-col overflow-hidden">
          <div className="bg-canal-900 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-serif">Vraag Utrecht</p>
              <p className="text-xs text-cream/60">AI-gids · kan je programma aanpassen</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white text-xl leading-none"
              aria-label="Sluiten"
            >
              ×
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/30">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === 'assistant'
                    ? 'bg-white text-canal-800 rounded-tl-sm'
                    : 'bg-canal-900 text-white rounded-tr-sm ml-auto'
                }`}
              >
                {m.content}
              </div>
            ))}
            {suggestions.length > 0 && (
              <div className="rounded-2xl bg-white p-3 text-sm">
                <p className="text-canal-500 text-xs mb-2">Suggesties:</p>
                <ul className="space-y-1">
                  {suggestions.map((s) => (
                    <li key={s.providerSlug} className="flex justify-between items-center gap-2">
                      <span className="text-canal-800 flex-1 min-w-0 truncate">{s.name}</span>
                      <span className="text-canal-600 whitespace-nowrap">
                        €{(s.priceCents / 100).toFixed(0)}
                      </span>
                      {onSamensteller ? (
                        <button
                          onClick={() => addSuggestion(s)}
                          className="rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white text-xs px-2 py-0.5"
                          title="Voeg toe aan mijn programma"
                        >
                          + voeg toe
                        </button>
                      ) : (
                        <a
                          href={`/aanbod/${s.providerSlug}`}
                          className="text-terracotta-600 text-xs hover:underline whitespace-nowrap"
                        >
                          bekijk →
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
                {!onSamensteller && (
                  <p className="mt-3 text-xs text-canal-500">
                    Ga naar{' '}
                    <a href="/samensteller" className="text-terracotta-600 underline">
                      de samensteller
                    </a>{' '}
                    om deze in één klik toe te voegen.
                  </p>
                )}
              </div>
            )}
            {busy && (
              <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-white text-canal-500 rounded-tl-sm">
                <em>Even nadenken…</em>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-canal-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Waar denken jullie aan?"
                className="flex-1 rounded-full border border-canal-200 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-canal-900 hover:bg-canal-800 text-white text-sm px-4 disabled:opacity-50"
              >
                →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
