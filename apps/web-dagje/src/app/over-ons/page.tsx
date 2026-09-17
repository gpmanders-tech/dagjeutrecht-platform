export const metadata = { title: 'Over ons' };

export default function OverOns() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose prose-canal">
      <h1 className="font-serif text-4xl text-canal-900 mb-6">Over DagjeUtrecht</h1>
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
      <h2 className="font-serif text-2xl mt-8">Waarom deze site?</h2>
      <p>
        Een groepsuitje regelen kost vaak veel mailen en bellen. Daarom werken we met vaste
        onderdelen bij vaste partners, zoals JEU de boules bar en Botenverhuur De Rijnstroom. Je
        ziet meteen wat het kost en binnen 2 werkdagen is alles bevestigd.
      </p>
      <h2 className="font-serif text-2xl mt-8">Contact</h2>
      <ul>
        <li>
          <a href="mailto:info@dagjeutrecht.nl" className="text-terracotta-600 underline">
            info@dagjeutrecht.nl
          </a>
        </li>
        <li>
          <a href="tel:+31302271439" className="text-terracotta-600 underline">
            030 - 227 14 39
          </a>
        </li>
      </ul>
      <h2 className="font-serif text-2xl mt-8">Ons bedrijf</h2>
      <ul>
        <li>Handelsonderneming Manders</li>
        <li>KvK 63330393</li>
        <li>Utrecht</li>
      </ul>
    </main>
  );
}
