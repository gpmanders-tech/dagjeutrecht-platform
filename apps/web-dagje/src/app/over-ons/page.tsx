export const metadata = { title: 'Over ons - DagjeUtrecht.nl' };

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
        We maken van Utrecht een dag om nooit meer te vergeten. Jij kiest de activiteiten, wij
        regelen de rest: van boeking bij de leverancier tot de factuur. Eén aanspreekpunt - Ger.
      </p>
      <h2 className="font-serif text-2xl mt-8">Waarom deze site?</h2>
      <p>
        Utrecht heeft honderden leuke plekken, maar wie ze allemaal moet bellen raakt de weg
        kwijt. Op DagjeUtrecht.nl combineer je zelf activiteiten uit 100+ getoetste leveranciers
        tot één programma, met AI-hulp en live prijsindicatie. Binnen 48u stuurt Ger een
        vrijblijvende offerte.
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
