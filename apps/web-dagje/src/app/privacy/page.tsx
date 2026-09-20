import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description:
    'Welke gegevens DagjeUtrecht van je verzamelt als je een dag aanvraagt of boekt, waar we ze voor gebruiken, met wie we ze delen en hoe lang we ze bewaren.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-inkt">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-6">Privacyverklaring</h1>

      <p className="mb-4">
        DagjeUtrecht (handelsnaam van Handelsonderneming Manders, KvK 63330393) verwerkt
        persoonsgegevens alleen voor het verwerken van aanvragen en het uitvoeren van boekingen.
      </p>

      <h2 className="text-2xl font-black uppercase tracking-tight text-inkt mt-8 mb-3">Wat we verzamelen</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Naam, e-mail, telefoon - via het aanvraagformulier</li>
        <li>Bedrijfsgegevens (naam, BTW-nr) als je factuur wil ontvangen</li>
        <li>Je keuzes in de samensteller (onderdelen, datum, aantal personen)</li>
      </ul>

      <h2 className="text-2xl font-black uppercase tracking-tight text-inkt mt-8 mb-3">Waar we het voor gebruiken</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Om je aanvraag te beantwoorden en een offerte te maken</li>
        <li>Om te boeken bij de door jou gekozen leveranciers</li>
        <li>Om je facturen en bevestigingen te sturen</li>
      </ul>

      <h2 className="text-2xl font-black uppercase tracking-tight text-inkt mt-8 mb-3">Delen met derden</h2>
      <p>
        Enkel met de leveranciers die je zelf hebt gekozen, én met onze administratie-tools
        (WeFact voor facturatie).
      </p>

      <h2 className="text-2xl font-black uppercase tracking-tight text-inkt mt-8 mb-3">Bewaartermijn</h2>
      <p>Aanvragen en bijbehorende gegevens: 7 jaar (fiscale bewaarplicht).</p>

      <h2 className="text-2xl font-black uppercase tracking-tight text-inkt mt-8 mb-3">Contact</h2>
      <p>
        Vragen of verzoeken (inzage, correctie, verwijdering)? Mail{' '}
        <a href="mailto:info@dagjeutrecht.nl" className="text-vlam-700 underline">
          info@dagjeutrecht.nl
        </a>
        .
      </p>
    </main>
  );
}
