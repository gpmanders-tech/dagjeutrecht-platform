import type { Metadata } from 'next';
import { Brotkrumen, Fragen, Kopf, type Frage } from '@/components/seo';

export const metadata: Metadata = {
  title: 'Busreise nach Utrecht für Gruppen',
  description:
    'Busreise und Gruppenreise nach Utrecht planen: Anreise, Tagesablauf, Programmideen und Partnertarife für Busunternehmen und Reiseveranstalter.',
  alternates: { canonical: '/busreise-utrecht' },
  openGraph: {
    title: 'Busreise nach Utrecht für Gruppen',
    description:
      'Anreise, Tagesablauf und Programmideen für Busgruppen in Utrecht, mit Partnertarifen für Busunternehmen und Reiseveranstalter.',
    url: '/busreise-utrecht',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Utrecht Incoming: Busreise nach Utrecht' }],
  },
};

const FRAGEN: Frage[] = [
  {
    q: 'Eignet sich Utrecht für einen Tagesausflug mit dem Bus?',
    a: 'Ja. Die Programmpunkte in der Altstadt liegen zu Fuß nah beieinander, rund um Paardenveld, Oudegracht und Domplein. Die Gruppe steigt einmal aus und erlebt den Tag ohne weitere Transfers.',
  },
  {
    q: 'Kann Utrecht Teil einer Rundreise durch die Niederlande sein?',
    a: 'Ja. Utrecht liegt in der Mitte des Landes und eignet sich als eigener Tag innerhalb einer mehrtägigen Gruppenreise, zum Beispiel als ruhigere Alternative zu Amsterdam.',
  },
  {
    q: 'Was ist bei der Planung mit dem Bus wichtig?',
    a: 'Planen Sie Ausstieg und Abholung nahe der Altstadt oder am Stadtrand bei Amelisweerd, je nach Programm. Treffpunkte und Zeiten stimmen wir bei der Gruppenanfrage mit Ihnen ab.',
  },
  {
    q: 'Gibt es Vouchers für den Reiseleiter?',
    a: 'Ja. Pro Programmpunkt gibt es einen Voucher als PDF, in 7 Sprachen und auf Wunsch mit Ihrem Logo.',
  },
  {
    q: 'Wie bekomme ich die Preise?',
    a: 'Registrieren Sie Ihr Unternehmen als Partner. Nach der Prüfung innerhalb von 2 Werktagen sehen Sie die Partnertarife im Katalog.',
  },
];

export default function Busreise() {
  return (
    <main>
      <Brotkrumen
        pfad={[
          { name: 'Startseite', url: '/' },
          { name: 'Busreise nach Utrecht', url: '/busreise-utrecht' },
        ]}
      />
      <Kopf aktiv="/busreise-utrecht" />
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-incoming-orange mb-3 uppercase tracking-wide text-sm">Für Busunternehmen</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6 max-w-3xl">Busreise nach Utrecht</h1>
        <p className="text-xl text-white/80 max-w-3xl">
          Utrecht ist die kompakte Alternative zu Amsterdam: eine historische Altstadt mit Grachten und Domturm, alles zu
          Fuß erreichbar, und direkt am Stadtrand das Grün von Amelisweerd. Wir stellen das Programm für Ihre Busgruppe
          zusammen und buchen bei unseren Partnern vor Ort.
        </p>
      </section>

      <section className="bg-cream text-canal-900 py-16">
        <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl mb-4">Anreise</h2>
            <p className="text-canal-600 mb-4">
              Utrecht liegt in der Mitte der Niederlande, an der Autobahn A12, die über Arnheim zur deutschen Grenze führt.
              Für Gruppen aus Nordrhein-Westfalen ist Utrecht damit gut als Tagesziel oder als erste Station einer
              Niederlande-Rundreise geeignet.
            </p>
            <p className="text-canal-600">
              Für Gruppen, die mit der Bahn anreisen, ist Utrecht Centraal der Ausgangspunkt: Paardenveld, wo die meisten
              Programme beginnen, liegt fünf Minuten zu Fuß vom Bahnhof entfernt.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl mb-4">Ein Tag in Utrecht mit der Busgruppe</h2>
            <ol className="space-y-3 text-canal-600">
              <li>
                <strong className="text-canal-900">Vormittag:</strong> Besteigung des Domturms mit Führung oder eine
                Stadtrallye durch die Altstadt.
              </li>
              <li>
                <strong className="text-canal-900">Mittag:</strong> Gruppenlunch im Zentrum, auch vegetarisch.
              </li>
              <li>
                <strong className="text-canal-900">Nachmittag:</strong> Grachtenrundfahrt über die Oudegracht, oder Jeu de
                Boules und Shuffleboard drinnen.
              </li>
              <li>
                <strong className="text-canal-900">Abschluss:</strong> ein Borrel, der niederländische Umtrunk, bevor der
                Bus wieder abfährt.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white text-canal-900 py-16">
        <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl mb-4">Was Utrecht Incoming übernimmt</h2>
            <ul className="space-y-2 text-canal-600 list-disc pl-5">
              <li>Programm aus festen Bausteinen bei Partnern in Utrecht</li>
              <li>Partnertarife für Reiseveranstalter, netto ohne Endkundenmarge</li>
              <li>Manuelle Bestätigung jeder Buchung bei den Anbietern</li>
              <li>Vouchers pro Programmpunkt, in 7 Sprachen, auf Wunsch mit Ihrem Logo</li>
              <li>Eine Sammelrechnung pro Monat</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl mb-4">Programmideen</h2>
            <p className="text-canal-600 mb-4">
              Alle Bausteine, Beispielprogramme und Jahreszeiten finden Sie auf der Seite{' '}
              <a href="/gruppenprogramme" className="text-incoming-orange underline">
                Gruppenprogramme und Tagesausflüge
              </a>
              . Von April bis Oktober kommen Kanu, Stand-up-Paddling und Grillen in Amelisweerd dazu.
            </p>
            <a
              href="/registrieren"
              className="inline-flex rounded-md bg-incoming-orange px-5 py-3 font-medium text-white hover:opacity-90"
            >
              Als Partner registrieren
            </a>
          </div>
        </div>
      </section>

      <Fragen fragen={FRAGEN} />
    </main>
  );
}
