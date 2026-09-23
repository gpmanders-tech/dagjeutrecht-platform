import type { Metadata } from 'next';
import Link from 'next/link';
import { BOUWSTENEN, PAKKETTEN, REGELS } from '../../lib/aanbod';
import { LANDING_LIJST } from '../../lib/landings';
import { Breadcrumbs } from '../../components/seo-jsonld';

export const metadata: Metadata = {
  title: 'Over ons: dagje Utrecht voor groepen',
  description:
    'DagjeUtrecht regelt dagprogramma’s in Utrecht voor groepen. Wie we zijn, met welke partners in de stad we werken en hoe we de dag voor je organiseren.',
  alternates: { canonical: '/over-ons' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'DagjeUtrecht',
    title: 'Over DagjeUtrecht: dagje Utrecht voor groepen',
    description: 'Wie we zijn, met welke partners in Utrecht we werken en hoe we de dag voor je groep organiseren.',
    url: '/over-ons',
    images: [{ url: '/og-image.png', width: 1200, height: 600, alt: 'DagjeUtrecht, dagprogramma’s in Utrecht' }],
  },
};

const PARTNERS = [
  { naam: 'JEU de boules bar', wat: 'jeu de boules op overdekte banen, de ontvangst en de borrel, aan Paardenveld' },
  { naam: 'The Grand Shuffle', wat: 'shuffleboard in het centrum' },
  { naam: 'Brothers Horeca Groep', wat: 'de groepslunch en de winterse lunch' },
  { naam: 'Botenverhuur De Rijnstroom', wat: 'kanoën, suppen, de picknick en de BBQ in Amelisweerd' },
  { naam: 'Domtoren', wat: 'de beklimming met gids' },
  { naam: 'Rederij Schuttevaer', wat: 'de rondvaart door de grachten' },
  { naam: 'Stepverhuur Utrecht', wat: 'de kickbikes voor de tocht langs de Kromme Rijn' },
];

export default function OverOns() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose">
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Over ons', url: '/over-ons' },
        ]}
      />
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-6">Over DagjeUtrecht</h1>
      <p>
        DagjeUtrecht is een handelsnaam van <strong>Handelsonderneming Manders</strong>, met
        jarenlange ervaring in georganiseerde groepsuitjes voor bedrijven, scholen en verenigingen
        in Utrecht.
      </p>
      <p>
        We maken van Utrecht een dag om nooit meer te vergeten. Jij kiest een pakket of stelt zelf
        een dag samen, wij regelen de reserveringen bij onze partners. Op de dag zelf is Ger jullie
        aanspreekpunt.
      </p>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">Waarom deze site?</h2>
      <p>
        Een groepsuitje regelen kost vaak veel mailen en bellen. Daarom werken we met vaste
        onderdelen bij vaste partners, zoals JEU de boules bar en Botenverhuur De Rijnstroom. Je
        ziet meteen wat het kost en binnen 3 werkdagen is alles bevestigd.
      </p>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">Onze partners in Utrecht</h2>
      <p>
        Alle {BOUWSTENEN.length} onderdelen die je bij ons boekt, worden uitgevoerd door vaste partners in de stad. De City
        Challenge door de binnenstad organiseren we zelf.
      </p>
      <ul>
        {PARTNERS.map((p) => (
          <li key={p.naam}>
            <strong>{p.naam}</strong>: {p.wat}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">Hoe we werken</h2>
      <p>
        Er zijn {PAKKETTEN.length} vaste pakketten, van een ochtend tot een hele dag. Elk pakket heeft een vaste prijs per
        persoon, inclusief btw, en die prijs is de som van de onderdelen. Je boekt vanaf {REGELS.minPers} personen, op
        donderdag, vrijdag of zaterdag, minimaal {REGELS.minDagenVooruit} dagen vooruit. Tot{' '}
        {REGELS.aantalDefinitiefDagenVooraf} dagen voor de datum kan het aantal personen nog veranderen.
      </p>
      <p>
        We maken bewust geen maatwerk. Vaste onderdelen bij vaste partners betekent dat we snel kunnen bevestigen en dat de
        prijs vooraf klopt.{' '}
        <Link href="/pakketten" className="text-vlam-700 underline">
          Bekijk de pakketten
        </Link>{' '}
        of{' '}
        <Link href="/bouwstenen" className="text-vlam-700 underline">
          alle onderdelen
        </Link>
        .
      </p>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">Voor wie</h2>
      <ul>
        {LANDING_LIJST.map((l) => (
          <li key={l.pad}>
            <Link href={l.pad} className="text-vlam-700 underline">
              {l.link} in Utrecht
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">Contact</h2>
      <ul>
        <li>
          <a href="mailto:info@dagjeutrecht.nl" className="text-vlam-700 underline">
            info@dagjeutrecht.nl
          </a>
        </li>
        <li>
          <a href="tel:+31302271439" className="text-vlam-700 underline">
            030 - 227 14 39
          </a>
        </li>
      </ul>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">Ons bedrijf</h2>
      <ul>
        <li>Handelsonderneming Manders</li>
        <li>KvK 63330393</li>
        <li>Utrecht</li>
      </ul>
    </main>
  );
}
