'use client';

import { useState, useTransition } from 'react';
import { Button, Input } from '@utrecht/ui';
import { saveBlogPost } from '@/app/actions/content';
import { useRouter } from 'next/navigation';

type Form = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  heroImage: string;
  domain: 'UTRECHTNOW' | 'DAGJEUTRECHT' | 'NACHTJEUTRECHT' | 'UTRECHTINCOMING';
  locale: 'nl' | 'en' | 'de' | 'fr' | 'es' | 'it' | 'pt';
  published: boolean;
  metaTitle: string;
  metaDesc: string;
};

const EMPTY: Form = {
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  heroImage: '',
  domain: 'UTRECHTNOW',
  locale: 'nl',
  published: false,
  metaTitle: '',
  metaDesc: '',
};

export function BlogEditor({ initial }: { initial?: Form }) {
  const [f, setF] = useState<Form>(initial ?? EMPTY);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  function save(publish?: boolean) {
    setError(null);
    startTransition(async () => {
      const result = await saveBlogPost({ ...f, published: publish ?? f.published });
      if ('error' in result) setError(result.error);
      else router.push('/content');
    });
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Field label="Titel *" value={f.title} onChange={(v) => set('title', v)} required />
        <Field label="Slug (URL-vriendelijk) *" value={f.slug} onChange={(v) => set('slug', v)} required placeholder="bv. 10-beste-dagjes-utrecht" />
        <Field label="Hero-afbeelding URL" value={f.heroImage} onChange={(v) => set('heroImage', v)} />
        <div>
          <label className="text-sm text-canal-700 block mb-1">Excerpt</label>
          <textarea
            className="w-full min-h-[60px] rounded-md border border-canal-200 p-3 text-sm"
            value={f.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-canal-700 block mb-1">
            Inhoud (Markdown ondersteund)
          </label>
          <textarea
            className="w-full min-h-[400px] rounded-md border border-canal-200 p-3 font-mono text-sm"
            value={f.body}
            onChange={(e) => set('body', e.target.value)}
            placeholder={'## Kop\n\nTekst met **vet** en *cursief* en [links](https://...).'}
          />
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bg-white border border-canal-100 rounded-2xl p-4">
          <h3 className="font-medium text-canal-900 mb-3">Publicatie</h3>
          <div>
            <label className="text-xs text-canal-700">Domein</label>
            <select
              className="w-full h-9 mt-1 border border-canal-200 rounded px-2"
              value={f.domain}
              onChange={(e) => set('domain', e.target.value as Form['domain'])}
            >
              <option value="UTRECHTNOW">UtrechtNow</option>
              <option value="DAGJEUTRECHT">DagjeUtrecht</option>
              <option value="NACHTJEUTRECHT">NachtjeUtrecht</option>
              <option value="UTRECHTINCOMING">UtrechtIncoming</option>
            </select>
          </div>
          <div className="mt-3">
            <label className="text-xs text-canal-700">Taal</label>
            <select
              className="w-full h-9 mt-1 border border-canal-200 rounded px-2 uppercase"
              value={f.locale}
              onChange={(e) => set('locale', e.target.value as Form['locale'])}
            >
              {['nl', 'en', 'de', 'fr', 'es', 'it', 'pt'].map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="mt-4 space-y-2">
            <Button onClick={() => save(false)} variant="outline" size="sm" className="w-full" disabled={pending}>
              Opslaan als concept
            </Button>
            <Button onClick={() => save(true)} size="sm" className="w-full" disabled={pending}>
              {pending ? 'Bezig…' : 'Publiceren'}
            </Button>
          </div>
        </div>
        <div className="bg-white border border-canal-100 rounded-2xl p-4">
          <h3 className="font-medium text-canal-900 mb-3">SEO</h3>
          <Field label="Meta-titel" value={f.metaTitle} onChange={(v) => set('metaTitle', v)} />
          <div className="mt-3">
            <label className="text-xs text-canal-700">Meta-omschrijving</label>
            <textarea
              className="w-full min-h-[60px] mt-1 rounded border border-canal-200 p-2 text-sm"
              value={f.metaDesc}
              onChange={(e) => set('metaDesc', e.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}
      </aside>
    </div>
  );
}

function Field({ label, value, onChange, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm text-canal-700 block mb-1">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} />
    </div>
  );
}
