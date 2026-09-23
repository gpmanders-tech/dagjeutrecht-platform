import type { Metadata } from 'next';
import { Brotkrumen, Fragen, JsonLd, Kopf, type Frage } from '@/components/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gruppenprogramm Utrecht: Tagesausflug',
  description:
    'Gruppenprogramme und Tagesausflüge in Utrecht für Reiseveranstalter: Domturm, Grachtenrundfahrt, Jeu de Boules, Stadtrallye und Kanu in Amelisweerd.',
  alternates: { canonical: '/gruppenprogramme' },
  openGraph: {
    title: 'Gruppenprogramm Utrecht: Tagesausflug',
    description:
      'Domturm, Grachtenrundfahrt, Jeu de Boules, Stadtrallye und Kanu in Amelisweerd: die Bausteine für Ihr Gruppenprogramm in Utrecht.',
    url: '/gruppenprogramme',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Utrecht Incoming: Gruppenprogramm Utrecht' }],
  },
};

type Baustein = { name: string; ort: string; dauer: string; text: string; saison?: string };

const ZENTRUM: Baustein[] = [
  {
    name: 'Domturm mit Führung',
    ort: 'Domplein',
    dauer: '1 Stunde',
    text: 'Mit einem Guide 465 Stufen hinauf auf den höchsten Punkt von Utrecht, mit Blick über die ganze Stadt. Nicht geeignet für Gäste mit Höhenangst oder eingeschränkter Mobilität.',
  },
  {
    name: 'Grachtenrundfahrt',
    ort: 'Anleger Oudegracht',
    dauer: '1 Stunde',
    text: 'Eine Rundfahrt mit Schuttevaer entlang der Werftkeller der Oudegracht und über die Singels.',
  },
  {
    name: 'Jeu de Boules',
    ort: 'JEU de boules bar, Paardenveld',
    dauer: '1,5 Stunden',
    text: 'Auf überdachten Bahnen, fünf Minuten zu Fuß von Utrecht Centraal. Die Gruppe spielt in Teams gegeneinander, mit Erklärung vor Ort und Snacks. Wetterunabhängig.',
  },
  {
    name: 'Shuffleboard',
    ort: 'The Grand Shuffle, Zentrum',
    dauer: '1,5 Stunden',
    text: 'Das Spiel, das man von Kreuzfahrtschiffen kennt, in der ersten Shuffleboard-Bar der Niederlande. Schnell gelernt, ideal für gemischte Gruppen.',
  },
  {
    name: 'City Challenge',
    ort: 'Start Paardenveld, Ziel Neude',
    dauer: '1,5 bis 2 Stunden',
    text: 'Eine Stadtrallye in Teams durch die Altstadt, mit Aufgaben und Fragen zu Dom, Werftkellern und Oudegracht. Zu Fuß und im eigenen Tempo.',
  },
  {
    name: 'Gruppenlunch und Borrel',
    ort: 'Zentrum',
    dauer: 'je 1 Stunde',
    text: 'Ein festes Lunchmenü, auch vegetarisch, und zum Abschluss ein Borrel: der niederländische Umtrunk mit Getränken und Bitterballen.',
  },
];

const AMELISWEERD: Baustein[] = [
  {
    name: 'Kanufahren auf der Kromme Rijn',
    ort: 'De Rijnstroom, Weg naar Rhijnauwen 2',
    dauer: '2 Stunden',
    saison: 'April bis Oktober',
    text: 'Zu zweit im Kanu durch das Landgut Amelisweerd. Schwimmwesten und wasserdichte Beutel sind dabei.',
  },
  {
    name: 'Stand-up-Paddling',
    ort: 'De Rijnstroom, Weg naar Rhijnauwen 2',
    dauer: '2 Stunden',
    saison: 'April bis Oktober',
    text: 'Jeder Gast hat ein eigenes Board auf dem ruhigen Wasser der Kromme Rijn. Schwimmen können ist Pflicht.',
  },
  {
    name: 'Picknick und Grillen am Wasser',
    ort: 'De Rijnstroom',
    dauer: '1 bis 2 Stunden',
    saison: 'April bis Oktober',
    text: 'Ein Picknickpaket pro Person zum Mittag, oder zum Abschluss ein Barbecue mit Getränken (ab 15 Personen).',
  },
  {
    name: 'Kickbike-Tour',
    ort: 'Zwischen Zentrum und Amelisweerd',
    dauer: '1,5 bis 2 Stunden',
    saison: 'April bis Oktober',
    text: 'Auf dem Kickbike eine feste Route entlang der Kromme Rijn, vom Grün zurück in die Stadt.',
  },
];

const BEISPIELE = [
  {
    name: 'Utrecht klassisch',
    fuer: 'Schulklassen, Vereine und Kulturreisen',
    ablauf: [
      ['10:00', 'Domturm mit Führung'],
      ['12:30', 'Gruppenlunch im Zentrum'],
      ['14:00', 'Grachtenrundfahrt über die Oudegracht'],
    ],
  },
  {
    name: 'Spiel und Borrel',
    fuer: 'Firmengruppen und Vereine, das ganze Jahr, wetterunabhängig',
    ablauf: [
      ['09:30', 'Empfang mit Kaffee und Kuchen'],
      ['10:00', 'Jeu de Boules'],
      ['12:30', 'Gruppenlunch'],
      ['14:00', 'Shuffleboard'],
      ['16:30', 'Borrel zum Abschluss'],
    ],
  },
  {
    name: 'Amelisweerd aktiv',
    fuer: 'Aktive Gruppen, April bis Oktober',
    ablauf: [
      ['10:00', 'Kanufahren auf der Kromme Rijn'],
      ['12:30', 'Picknick am Wasser'],
      ['14:00', 'Kickbike-Tour'],
      ['16:30', 'Barbecue mit Getränken'],
    ],
  },
];

const FRAGEN: Frage[] = [
  {
    q: 'Kann ich die Bausteine frei kombinieren?',
    a: 'Ja. Die Beispielprogramme sind ein Vorschlag. Im Partnerportal stellen Sie das Programm für Ihre Gruppe selbst zusammen und senden eine Gruppenanfrage.',
  },
  {
    q: 'Was passiert bei schlechtem Wetter?',
    a: 'Jeu de Boules, Shuffleboard, Lunch und Borrel finden drinnen statt. Das Programm Spiel und Borrel ist komplett wetterunabhängig.',
  },
  {
    q: 'Gibt es Programme im Winter?',
    a: 'Ja. Kanu, SUP, Picknick und Barbecue gibt es von April bis Oktober. Domturm, Grachtenrundfahrt, Jeu de Boules, Shuffleboard und die City Challenge sind das ganze Jahr möglich, im Winter auch mit Glühwein zum Empfang und einem warmen Mittagessen.',
  },
  {
    q: 'Wo sehe ich die Preise?',
    a: 'Die Partnertarife sehen Sie nach der Registrierung im Partnerkatalog. Wir prüfen jede Registrierung innerhalb von 2 Werktagen.',
  },
];

function Liste({ titel, text, bausteine }: { titel: string; text: string; bausteine: Baustein[] }) {
  return (
    <section className="py-12">
      <h2 className="font-serif text-3xl mb-3">{titel}</h2>
      <p className="text-canal-600 max-w-3xl mb-8">{text}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {bausteine.map((b) => (
          <article key={b.name} className="rounded-xl bg-white p-6 shadow-soft">
            <h3 className="font-serif text-2xl mb-1">{b.name}</h3>
            <p className="text-sm text-incoming-orange mb-3">
              {b.dauer} · {b.ort}
              {b.saison ? ` · ${b.saison}` : ''}
            </p>
            <p className="text-canal-600">{b.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Gruppenprogramme() {
  return (
    <main>
      <Brotkrumen
        pfad={[
          { name: 'Startseite', url: '/' },
          { name: 'Gruppenprogramme', url: '/gruppenprogramme' },
        ]}
      />
      {BEISPIELE.map((b) => (
        <JsonLd
          key={b.name}
          data={{
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: `${b.name}: Gruppenprogramm Utrecht`,
            touristType: b.fuer,
            url: `${SITE_URL}/gruppenprogramme`,
            provider: { '@id': `${SITE_URL}#organization` },
            itinerary: {
              '@type': 'ItemList',
              itemListElement: b.ablauf.map(([, was], i) => ({ '@type': 'ListItem', position: i + 1, name: was })),
            },
          }}
        />
      ))}
      <Kopf aktiv="/gruppenprogramme" />
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-incoming-orange mb-3 uppercase tracking-wide text-sm">Gruppenprogramme</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6 max-w-3xl">Gruppenprogramm und Tagesausflug in Utrecht</h1>
        <p className="text-xl text-white/80 max-w-3xl">
          Die Bausteine für Ihre Gruppe in Utrecht: in der Altstadt rund um Dom und Oudegracht, und in Amelisweerd an der
          Kromme Rijn. Alles bei festen Partnern vor Ort.
        </p>
      </section>

      <div className="bg-cream text-canal-900">
        <div className="max-w-5xl mx-auto px-6">
          <Liste
            titel="In der Altstadt"
            text="Rund um Paardenveld, die Oudegracht und den Domplein, zu Fuß erreichbar von Utrecht Centraal. Die meisten Programmpunkte sind drinnen und damit das ganze Jahr möglich."
            bausteine={ZENTRUM}
          />
          <Liste
            titel="In Amelisweerd"
            text="Das Landgut Amelisweerd liegt am Stadtrand an der Kromme Rijn. Treffpunkt ist der Bootsverleih De Rijnstroom. Ideal für aktive Gruppen im Sommerhalbjahr."
            bausteine={AMELISWEERD}
          />
        </div>
      </div>

      <section className="bg-white text-canal-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-3">Beispiele für einen Tagesausflug</h2>
          <p className="text-canal-600 max-w-3xl mb-8">
            So kann ein Tag in Utrecht für Ihre Gruppe aussehen. Jeder Programmpunkt lässt sich austauschen.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {BEISPIELE.map((b) => (
              <article key={b.name} className="rounded-xl border border-canal-100 p-6">
                <h3 className="font-serif text-2xl mb-1">{b.name}</h3>
                <p className="text-sm text-canal-500 mb-4">{b.fuer}</p>
                <ol className="space-y-2">
                  {b.ablauf.map(([zeit, was]) => (
                    <li key={zeit} className="flex gap-3">
                      <span className="w-12 shrink-0 font-medium text-incoming-orange">{zeit}</span>
                      <span className="text-canal-600">{was}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
          <p className="mt-10 text-canal-600">
            Mit dem Bus unterwegs? Lesen Sie auch unsere Hinweise zur{' '}
            <a href="/busreise-utrecht" className="text-incoming-orange underline">
              Busreise nach Utrecht
            </a>
            . Partnertarife sehen Sie nach der{' '}
            <a href="/registrieren" className="text-incoming-orange underline">
              Registrierung als Partner
            </a>
            .
          </p>
        </div>
      </section>

      <Fragen fragen={FRAGEN} />
    </main>
  );
}
