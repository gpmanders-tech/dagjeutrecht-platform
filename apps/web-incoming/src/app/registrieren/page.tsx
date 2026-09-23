import { RegistrationForm } from '@/components/registration-form';

import type { Metadata } from 'next';
import { Brotkrumen } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Als Partner registrieren',
  description:
    'Registrieren Sie sich als Reiseveranstalter, DMC oder Schulreise-Spezialist bei Utrecht Incoming. Wir prüfen jede Anfrage manuell innerhalb von 2 Werktagen.',
  alternates: { canonical: '/registrieren' },
};

export default function RegisterPage() {
  return (
    <main className="bg-incoming-navy text-white min-h-screen">
      <Brotkrumen
        pfad={[
          { name: 'Startseite', url: '/' },
          { name: 'Als Partner registrieren', url: '/registrieren' },
        ]}
      />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-incoming-orange uppercase tracking-wide text-sm mb-2">Utrecht Incoming</p>
        <h1 className="font-serif text-4xl mb-3">Als Partner registrieren</h1>
        <p className="text-white/80 mb-10">
          Reiseveranstalter, DMC und Schulreise-Spezialisten: bewerben Sie sich um Zugang zu unseren Partnertarifen.
          Wir prüfen jede Anfrage manuell innerhalb von 2 Werktagen.
        </p>
        <RegistrationForm />
        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl mb-4">Wer sich registrieren kann</h2>
          <p className="text-white/80 mb-8">
            Utrecht Incoming arbeitet ausschließlich mit Unternehmen: Reiseveranstalter, DMC, Busunternehmen und
            Schulreise-Spezialisten, die Gruppenreisen in die Niederlande anbieten. Einzelreisende und Privatgruppen buchen
            ihren Tagesausflug auf Niederländisch bei DagjeUtrecht. Nach Ihrer Registrierung prüfen wir die Angaben und
            schalten Ihren Zugang zum Partnerportal frei.
          </p>
          <h2 className="font-serif text-2xl mb-4">Was Sie als Partner erhalten</h2>
          <ul className="space-y-2 text-white/80 list-disc pl-5">
            <li>Partnertarife für alle Anbieter in Utrecht, netto ohne Endkundenmarge</li>
            <li>Aktivitäten, Hotels, Restaurants und Touren in einer Buchung</li>
            <li>Gruppenanfragen direkt aus dem Partnerportal, jede Buchung manuell bestätigt</li>
            <li>Vouchers als PDF in 7 Sprachen, auf Wunsch mit Ihrem Logo</li>
            <li>Eine Sammelrechnung pro Monat</li>
          </ul>
          <p className="mt-6 text-white/80">
            Noch unsicher, ob Utrecht zu Ihrem Programm passt? Sehen Sie sich die{' '}
            <a href="/gruppenprogramme" className="underline text-incoming-orange">
              Gruppenprogramme
            </a>{' '}
            an oder lesen Sie unsere Hinweise zur{' '}
            <a href="/busreise-utrecht" className="underline text-incoming-orange">
              Busreise nach Utrecht
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
