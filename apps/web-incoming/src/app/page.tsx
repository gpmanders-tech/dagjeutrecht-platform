import type { Metadata } from 'next';
import { Button, UtrechtSkyline } from '@utrecht/ui';
import { Brotkrumen, Fragen, Kopf, type Frage } from '@/components/seo';

export const metadata: Metadata = {
  title: { absolute: 'Gruppenreise Utrecht: Incoming-Partner für Reiseveranstalter' },
  description:
    'Gruppenreisen und Busreisen nach Utrecht für Reiseveranstalter: Gruppenprogramme, Partnertarife, mehrsprachige Vouchers und eine Sammelrechnung pro Monat.',
  alternates: { canonical: '/' },
};

const FRAGEN: Frage[] = [
  {
    q: 'Für wen ist Utrecht Incoming?',
    a: 'Für Reiseveranstalter, DMC, Busunternehmen und Schulreise-Spezialisten, die Gruppenreisen nach Utrecht anbieten. Wir arbeiten ausschließlich B2B, nicht mit Einzelreisenden.',
  },
  {
    q: 'Wie werde ich Partner?',
    a: 'Registrieren Sie Ihr Unternehmen über das Formular. Wir prüfen jede Anfrage manuell innerhalb von 2 Werktagen. Danach sehen Sie im Partnerportal die Partnertarife.',
  },
  {
    q: 'Was sind Partnertarife?',
    a: 'Nettopreise für Reiseveranstalter, ohne Endkundenmarge. Sie sehen sie nach der Freischaltung im Partnerkatalog.',
  },
  {
    q: 'Wie werden Buchungen bestätigt?',
    a: 'Verfügbarkeit gibt es auf Anfrage. Jede Buchung wird von uns manuell bei den Anbietern in Utrecht bestätigt.',
  },
  {
    q: 'Wie wird abgerechnet?',
    a: 'Mit einer Sammelrechnung pro Monat, statt einer Rechnung pro Anbieter.',
  },
  {
    q: 'In welchen Sprachen gibt es die Vouchers?',
    a: 'Die Vouchers gibt es als PDF in 7 Sprachen, auf Wunsch mit Ihrem Logo (Whitelabel).',
  },
];

export default function Home() {
  return (
    <main>
      <Brotkrumen pfad={[{ name: 'Startseite', url: '/' }]} />
      <Kopf aktiv="/" />
      <section className="relative overflow-hidden">
        <UtrechtSkyline className="absolute inset-x-0 bottom-0 w-full h-[60%] text-white opacity-[0.08] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <p className="text-incoming-orange mb-3 uppercase tracking-wide text-sm">Utrecht Incoming</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl text-white">
            Ihr Partner für Gruppenreisen nach Utrecht.
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            Partnertarife, Gruppenkapazitäten, mehrsprachige Vouchers, Sammelrechnung pro Monat.
            Reiseveranstalter, DMC und Schulreise-Spezialisten willkommen.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/registrieren">
              <Button variant="incoming" size="lg">Als Partner registrieren</Button>
            </a>
            <a href="/gruppenprogramme">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Gruppenprogramme ansehen
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white text-canal-900 py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Feature title="Nettopreise" desc="Partnertarife für alle ~100 Anbieter in Utrecht." />
          <Feature title="Eine Plattform" desc="Aktivitäten, Hotels, Restaurants, Touren in einer Buchung." />
          <Feature title="Whitelabel-Vouchers" desc="Mit Ihrem Logo, in 7 Sprachen, als PDF." />
        </div>
      </section>

      <section className="bg-cream text-canal-900 py-16">
        <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl mb-4">Warum eine Gruppenreise nach Utrecht?</h2>
            <p className="text-canal-600 mb-4">
              Utrecht liegt mitten in den Niederlanden und ist kompakter und ruhiger als Amsterdam. Die Altstadt mit dem
              Domturm, der Oudegracht und den Werftkellern am Wasser erkunden Gruppen zu Fuß. Direkt am Stadtrand beginnt
              mit Amelisweerd ein Landgut an der Kromme Rijn, wo man Kanu fährt und picknickt.
            </p>
            <p className="text-canal-600">
              Für Ihre Gäste bedeutet das: kurze Wege zwischen den Programmpunkten, keine langen Transfers und eine Stadt, die
              sich an einem Tag gut erleben lässt. Als Tagesausflug oder als eigener Tag innerhalb einer Rundreise durch die
              Niederlande.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl mb-4">So arbeiten wir mit Reiseveranstaltern</h2>
            <ol className="space-y-3 text-canal-600 list-decimal pl-5">
              <li>Sie registrieren Ihr Unternehmen als Partner. Wir prüfen jede Anfrage innerhalb von 2 Werktagen.</li>
              <li>Im Partnerportal sehen Sie die Partnertarife aller Anbieter.</li>
              <li>Sie stellen das Programm für Ihre Gruppe zusammen und senden eine Gruppenanfrage.</li>
              <li>Wir bestätigen jede Buchung manuell bei den Anbietern in Utrecht.</li>
              <li>Sie erhalten Vouchers pro Programmpunkt und am Monatsende eine Sammelrechnung.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white text-canal-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-4">Bausteine für Ihr Gruppenprogramm</h2>
          <p className="text-canal-600 max-w-3xl mb-8">
            Die Klassiker für Gruppen in Utrecht: Besteigung des Domturms mit Führung, Grachtenrundfahrt über die Oudegracht,
            Jeu de Boules und Shuffleboard im Zentrum, eine Stadtrallye durch die Altstadt und Kanufahren in Amelisweerd.
            Dazu Gruppenlunch und ein Borrel, der niederländische Umtrunk zum Abschluss.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <Kachel
              href="/gruppenprogramme"
              titel="Gruppenprogramme und Tagesausflüge"
              text="Alle Programmbausteine in Utrecht, mit Dauer, Ort und Saison. Für Tagesausflüge und mehrtägige Gruppenreisen."
            />
            <Kachel
              href="/busreise-utrecht"
              titel="Busreise nach Utrecht"
              text="Was Busunternehmen und Reiseleiter über Utrecht wissen sollten: Anreise, Tagesablauf und Programmideen."
            />
          </div>
        </div>
      </section>

      <Fragen fragen={FRAGEN} />
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="font-serif text-2xl mb-2">{title}</h3>
      <p className="text-canal-600">{desc}</p>
    </div>
  );
}

function Kachel({ href, titel, text }: { href: string; titel: string; text: string }) {
  return (
    <a href={href} className="block rounded-xl border border-canal-100 p-6 shadow-soft hover:border-incoming-orange transition-colors">
      <h3 className="font-serif text-2xl mb-2">{titel}</h3>
      <p className="text-canal-600">{text}</p>
      <p className="mt-4 font-medium text-incoming-orange">Mehr erfahren</p>
    </a>
  );
}
