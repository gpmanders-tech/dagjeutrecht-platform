import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact: vraag je dagje Utrecht aan',
  description:
    'Vragen over een dagje Utrecht voor je groep? Bel 030 2271439 of mail info@dagjeutrecht.nl. We denken graag mee over datum, groepsgrootte en programma.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-6">Contact</h1>
      <p className="text-inkt mb-8">
        Een dag boeken doe je het snelst via de{' '}
        <a href="/boeken" className="text-vlam-700 underline">
          samensteller
        </a>
        . Vragen over een boeking? Neem gerust contact op:
      </p>
      <div className="rounded-2xl border border-inkt/10 bg-zee-50 p-6 text-inkt space-y-2">
        <p>
          <strong>DagjeUtrecht</strong>
        </p>
        <p>Ger</p>
        <p>
          <a href="mailto:info@dagjeutrecht.nl" className="text-vlam-700 underline">
            info@dagjeutrecht.nl
          </a>
        </p>
        <p>
          <a href="tel:+31302271439" className="text-vlam-700 underline">
            030 - 227 14 39
          </a>
        </p>
      </div>
      <p className="text-xs text-grijs mt-3">
        DagjeUtrecht is een handelsnaam van Traxeo, KvK 63330393.
      </p>
    </main>
  );
}
