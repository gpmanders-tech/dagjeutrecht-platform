import type { Metadata } from 'next';
import { Kopf } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Datenschutz',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
};

const ABSCHNITTE: [string, string][] = [
  [
    'Verantwortlicher',
    'Traxeo, Handelsname Utrecht Incoming, Raiffeisenlaan 42, 3571 TE Utrecht, Niederlande, info@utrechtincoming.nl.',
  ],
  [
    'Welche Daten wir verarbeiten',
    'Wenn Sie eine Gruppenanfrage senden oder sich als Partner registrieren, verarbeiten wir die Angaben aus dem Formular: Firma, Name, E-Mail-Adresse, Telefonnummer, Land und Ihre Nachricht. Kommen Sie über eine Google-Anzeige auf unsere Website, speichern wir zusammen mit der Anfrage die Kennung der Anzeige (gclid bzw. utm-Angaben), damit wir sehen, welche Anzeige funktioniert.',
  ],
  [
    'Zweck und Rechtsgrundlage',
    'Wir verwenden die Daten nur, um Ihre Anfrage zu beantworten, ein Angebot zu erstellen und eine Buchung abzuwickeln (Art. 6 Abs. 1 lit. b DSGVO), sowie für unsere Buchhaltung, soweit wir gesetzlich dazu verpflichtet sind (Art. 6 Abs. 1 lit. c DSGVO).',
  ],
  [
    'Cookies und Tracking',
    'Wir setzen keine Analyse- oder Werbecookies. Nur nach dem Login im Partnerportal wird ein technisch notwendiges Sitzungscookie gesetzt.',
  ],
  [
    'Dienstleister',
    'Die Website läuft bei Vercel, die Datenbank bei Neon und unser E-Mail-Postfach bei Hostnet (Niederlande). Diese Dienstleister verarbeiten Daten nur in unserem Auftrag.',
  ],
  [
    'Speicherdauer',
    'Anfragen ohne Buchung löschen wir spätestens zwei Jahre nach dem letzten Kontakt. Buchungs- und Rechnungsdaten bewahren wir so lange auf, wie das Steuerrecht es verlangt (in den Niederlanden sieben Jahre).',
  ],
  [
    'Ihre Rechte',
    'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Schreiben Sie dazu an info@utrechtincoming.nl. Sie können sich außerdem bei einer Datenschutzbehörde beschweren, in den Niederlanden bei der Autoriteit Persoonsgegevens.',
  ],
];

export default function DatenschutzPage() {
  return (
    <main className="bg-incoming-navy text-white min-h-screen">
      <Kopf />
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-6 text-white/85">
        <h1 className="font-serif text-4xl text-white">Datenschutz</h1>
        {ABSCHNITTE.map(([t, x]) => (
          <section key={t}>
            <h2 className="font-serif text-xl text-white mb-2">{t}</h2>
            <p>{x}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
