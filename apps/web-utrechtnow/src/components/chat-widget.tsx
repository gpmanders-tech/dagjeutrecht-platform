'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@utrecht/ui';
import { useLocale } from 'next-intl';

type Msg = { role: 'user' | 'assistant'; content: string };

export function ChatWidget() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], locale }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'Sorry, ik kon je niet helpen.' }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Verbinding mislukt. Probeer het later.' }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-terracotta text-white shadow-soft hover:bg-terracotta-600 flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-soft border border-canal-200 flex flex-col overflow-hidden">
      <div className="bg-canal text-white px-4 py-3 flex justify-between items-center">
        <p className="font-medium">Vraag het ons</p>
        <button onClick={() => setOpen(false)} className="hover:opacity-70" aria-label="Sluit">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-canal-500">
            Hoi! Vraag me alles over Utrecht — wat te doen, waar te eten, hoe te boeken.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm p-3 rounded-lg max-w-[85%] ${
              m.role === 'user'
                ? 'bg-canal text-white ml-auto'
                : 'bg-canal-50 text-canal-900'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-sm p-3 rounded-lg bg-canal-50 text-canal-500 max-w-[85%]">…</div>
        )}
      </div>
      <div className="border-t border-canal-100 p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Typ een vraag…"
          className="flex-1 h-10 rounded-md border border-canal-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-canal-500"
        />
        <Button onClick={send} size="sm" disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
