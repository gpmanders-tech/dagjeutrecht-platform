'use client';

import { useState, useTransition } from 'react';
import { Button, Input } from '@utrecht/ui';
import { saveFaq } from '@/app/actions/content';
import { useRouter } from 'next/navigation';

export function FaqEditor() {
  const [f, setF] = useState({
    question: '',
    answer: '',
    category: '',
    domain: 'UTRECHTNOW',
    locale: 'nl',
    position: 0,
  });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await saveFaq(f as any);
      if ('error' in result) setError(result.error);
      else router.push('/content');
    });
  }

  return (
    <form onSubmit={submit} className="bg-white border border-canal-100 rounded-2xl p-6 space-y-4 shadow-soft">
      <div>
        <label className="text-sm text-canal-700 block mb-1">Vraag *</label>
        <Input value={f.question} onChange={(e) => setF({ ...f, question: e.target.value })} required />
      </div>
      <div>
        <label className="text-sm text-canal-700 block mb-1">Antwoord *</label>
        <textarea
          required
          value={f.answer}
          onChange={(e) => setF({ ...f, answer: e.target.value })}
          className="w-full min-h-[120px] rounded-md border border-canal-200 p-3"
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="text-sm text-canal-700 block mb-1">Categorie</label>
          <Input value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} placeholder="Bv. Betalen" />
        </div>
        <div>
          <label className="text-sm text-canal-700 block mb-1">Domein</label>
          <select
            className="h-11 w-full rounded-md border border-canal-200 px-3"
            value={f.domain}
            onChange={(e) => setF({ ...f, domain: e.target.value })}
          >
            <option value="UTRECHTNOW">UtrechtNow</option>
            <option value="DAGJEUTRECHT">DagjeUtrecht</option>
            <option value="NACHTJEUTRECHT">NachtjeUtrecht</option>
            <option value="UTRECHTINCOMING">UtrechtIncoming</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-canal-700 block mb-1">Taal</label>
          <select
            className="h-11 w-full rounded-md border border-canal-200 px-3 uppercase"
            value={f.locale}
            onChange={(e) => setF({ ...f, locale: e.target.value })}
          >
            {['nl', 'en', 'de', 'fr', 'es', 'it', 'pt'].map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </div>
      </div>
      {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}
      <Button type="submit" disabled={pending}>{pending ? 'Opslaan…' : 'Opslaan'}</Button>
    </form>
  );
}
