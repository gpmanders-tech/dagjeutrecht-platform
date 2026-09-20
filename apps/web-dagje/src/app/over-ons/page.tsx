import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over ons',
  description:
    'DagjeUtrecht regelt dagprogramma’s in Utrecht voor groepen. Wie we zijn, met welke partners in de stad we werken en hoe we de dag voor je organiseren.',
  alternates: { canonical: '/over-ons' },
};

export default function OverOns() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose">
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
