import type { Metadata } from 'next';
import { AnfrageForm } from '@/components/anfrage-form';
import { Brotkrumen, Kopf } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Gruppenanfrage Utrecht',
  description:
    'Unverbindliche Gruppenanfrage für Utrecht: Sie nennen Termin, Gruppengröße und Wünsche, wir senden Ihnen einen Programmvorschlag mit Nettopreisen.',
  alternates: { canonical: '/anfrage' },
};

const SCHRITTE: [string, string][] = [
  ['Sie fragen an', 'Termin, Gruppengröße und Wünsche. Mehr brauchen wir nicht.'],
  ['Wir planen', 'Wir stellen ein Programm in Utrecht zusammen und prüfen die Verfügbarkeit bei den Anbietern.'],
  ['Sie entscheiden', 'Sie erhalten den Vorschlag mit Nettopreisen pro Person per E-Mail, auf Deutsch.'],
];

export default function AnfragePage() {
  return (
    <main className="bg-incoming-navy text-white min-h-screen">
      <Brotkrumen pfad={[{ name: 'Startseite', url: '/' }, { name: 'Gruppenanfrage', url: '/anfrage' }]} />
      <Kopf aktiv="/anfrage" />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-incoming-orange uppercase tracking-wide text-sm mb-2">Utrecht Incoming</p>
        <h1 className="font-serif text-4xl mb-3">Gruppenanfrage für Utrecht</h1>
        <p className="text-white/80 mb-8">
          Planen Sie eine Busreise, Vereinsfahrt oder Studienreise mit Station in Utrecht? Schreiben Sie uns, was Sie vorhaben.
          Wir senden Ihnen einen Programmvorschlag mit Nettopreisen.
        </p>
        <ol className="grid gap-3 sm:grid-cols-3 mb-10">
          {SCHRITTE.map(([t, x], i) => (
            <li key={t} className="rounded-xl border border-white/10 p-4">
              <p className="font-medium">
                <span className="text-incoming-orange mr-2">{i + 1}.</span>
                {t}
              </p>
              <p className="text-sm text-white/70 mt-1">{x}</p>
            </li>
          ))}
        </ol>
        <AnfrageForm />
        <p className="mt-8 text-sm text-white/70">
          Lieber direkt per E-Mail? Schreiben Sie an{' '}
          <a href="mailto:info@utrechtincoming.nl" className="underline text-incoming-orange">info@utrechtincoming.nl</a>.
        </p>
      </div>
    </main>
  );
}
