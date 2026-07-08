'use client';

import { useState, useTransition } from 'react';
import { Button, Input } from '@utrecht/ui';
import { saveProvider, rescrapeProvider } from '@/app/actions/provider';
import { useRouter } from 'next/navigation';

type ProviderForm = {
  id: string;
  slug: string;
  websiteUrl: string;
  heroImage: string;
  bookable: boolean;
  active: boolean;
  rating: number | null;
  modifyDeadlineHours: number;
  canChangeTime: boolean;
  canChangeCount: boolean;
};

export function ProviderEditor({ provider }: { provider: ProviderForm }) {
  const [f, setF] = useState(provider);
  const [pending, startTransition] = useTransition();
  const [scraping, startScrape] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await saveProvider(f);
      if ('error' in res) setMsg(res.error);
      else {
        setMsg('✓ Opgeslagen');
        router.refresh();
      }
    });
  }

  function rescrape() {
    setMsg(null);
    startScrape(async () => {
      const res = await rescrapeProvider(f.id, f.websiteUrl);
      if ('error' in res) setMsg(res.error);
      else if (res.heroImage) {
        setF({ ...f, heroImage: res.heroImage });
        setMsg('✓ Nieuwe foto opgehaald — niet vergeten op te slaan');
      } else {
        setMsg('Geen og:image gevonden op die URL.');
      }
    });
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Section title="Website + foto">
          <Field
            label="Website-URL"
            value={f.websiteUrl}
            onChange={(v) => setF({ ...f, websiteUrl: v })}
            placeholder="https://..."
          />
          <Field
            label="Foto-URL (laat leeg voor scrape, of plak eigen URL)"
            value={f.heroImage}
            onChange={(v) => setF({ ...f, heroImage: v })}
            placeholder="https://..."
          />
          <Button onClick={rescrape} variant="outline" size="sm" disabled={scraping || !f.websiteUrl}>
            {scraping ? 'Bezig…' : '🔄 og:image scrapen van website'}
          </Button>
        </Section>

        <Section title="Status">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={f.active}
              onChange={(e) => setF({ ...f, active: e.target.checked })}
            />
            Actief (zichtbaar in aanbod)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={f.bookable}
              onChange={(e) => setF({ ...f, bookable: e.target.checked })}
            />
            Boekbaar (anders TIP-kaart zonder boekknop)
          </label>
        </Section>

        <Section title="Wijzigingsbeleid">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-canal-700">Wijzig-deadline (uur)</label>
              <Input
                type="number"
                min={0}
                value={f.modifyDeadlineHours}
                onChange={(e) => setF({ ...f, modifyDeadlineHours: parseInt(e.target.value) || 0 })}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={f.canChangeTime}
                onChange={(e) => setF({ ...f, canChangeTime: e.target.checked })}
              />
              Tijd wijzigbaar
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={f.canChangeCount}
                onChange={(e) => setF({ ...f, canChangeCount: e.target.checked })}
              />
              Aantal wijzigbaar
            </label>
          </div>
        </Section>

        <Section title="Beoordeling">
          <Field
            label="Rating (handmatig overschrijven — anders automatisch via reviews)"
            value={f.rating?.toString() ?? ''}
            onChange={(v) => setF({ ...f, rating: v ? parseFloat(v) : null })}
            placeholder="4.7"
          />
        </Section>

        {msg && <p className={`text-sm p-2 rounded ${msg.startsWith('✓') ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{msg}</p>}

        <Button onClick={save} disabled={pending}>{pending ? 'Opslaan…' : 'Opslaan'}</Button>
      </div>

      <aside>
        <p className="text-sm text-canal-700 mb-2">Voorbeeld huidige foto:</p>
        <div className="aspect-[5/3] bg-canal-100 rounded-xl overflow-hidden border border-canal-200">
          <img
            src={
              f.heroImage ||
              `https://picsum.photos/seed/utrechtnow-${f.slug}/480/288`
            }
            alt={f.slug}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <p className="text-xs text-canal-500 mt-2 break-all">
          {f.heroImage || '(picsum placeholder)'}
        </p>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-canal-100 rounded-2xl p-5 shadow-soft space-y-3">
      <h2 className="font-serif text-lg text-canal-900">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-canal-700 block mb-1">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
