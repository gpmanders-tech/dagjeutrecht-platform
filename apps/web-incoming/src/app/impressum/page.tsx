import type { Metadata } from 'next';
import { Kopf } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Impressum',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="bg-incoming-navy text-white min-h-screen">
      <Kopf />
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-6 text-white/85">
        <h1 className="font-serif text-4xl text-white">Impressum</h1>
        <section>
          <h2 className="font-serif text-xl text-white mb-2">Anbieter</h2>
          <p>
            Utrecht Incoming ist ein Handelsname von Traxeo (Einzelunternehmen nach niederländischem Recht).
            <br />
            Raiffeisenlaan 42
            <br />
            3571 TE Utrecht
            <br />
            Niederlande
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-white mb-2">Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:info@utrechtincoming.nl" className="underline">info@utrechtincoming.nl</a>
            <br />
            Kontaktformular: <a href="/anfrage" className="underline">utrechtincoming.nl/anfrage</a>
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-white mb-2">Register und Steuern</h2>
          <p>
            Handelsregister: Kamer van Koophandel (KvK), Nummer 63330393
            <br />
            Umsatzsteuer-Identifikationsnummer: NL001698541B16
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-white mb-2">Hinweis</h2>
          <p>
            Utrecht Incoming richtet sich ausschließlich an Unternehmen (Reiseveranstalter, Busunternehmen, DMC und
            Schulreise-Spezialisten). Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </main>
  );
}
