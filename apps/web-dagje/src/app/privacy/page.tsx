export const metadata = { title: 'Privacy - DagjeUtrecht.nl' };

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-canal-800">
      <h1 className="font-serif text-4xl text-canal-900 mb-6">Privacyverklaring</h1>

      <p className="mb-4">
        DagjeUtrecht (handelsnaam van Handelsonderneming Manders, KvK 63330393) verwerkt
        persoonsgegevens alleen voor het verwerken van aanvragen en het uitvoeren van boekingen.
      </p>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Wat we verzamelen</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Naam, e-mail, telefoon - via het aanvraagformulier</li>
        <li>Bedrijfsgegevens (naam, BTW-nr) als je factuur wil ontvangen</li>
        <li>Voorkeuren uit de samensteller (activiteiten, budget, datum)</li>
      </ul>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Waar we het voor gebruiken</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Om je aanvraag te beantwoorden en een offerte te maken</li>
        <li>Om te boeken bij de door jou gekozen leveranciers</li>
        <li>Om je facturen en bevestigingen te sturen</li>
      </ul>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Delen met derden</h2>
      <p>
        Enkel met de leveranciers die je zelf hebt gekozen, én met onze administratie-tools
        (WeFact voor facturatie).
      </p>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Bewaartermijn</h2>
      <p>Aanvragen en bijbehorende gegevens: 7 jaar (fiscale bewaarplicht).</p>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Contact</h2>
      <p>
        Vragen of verzoeken (inzage, correctie, verwijdering)? Mail{' '}
        <a href="mailto:info@dagjeutrecht.nl" className="text-terracotta-600 underline">
          info@dagjeutrecht.nl
        </a>
        .
      </p>
    </main>
  );
}
