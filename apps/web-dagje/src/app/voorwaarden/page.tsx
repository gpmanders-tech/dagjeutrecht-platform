export const metadata = { title: 'Voorwaarden - DagjeUtrecht.nl' };

export default function VoorwaardenPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-canal-800">
      <h1 className="font-serif text-4xl text-canal-900 mb-6">Algemene voorwaarden</h1>
      <p className="mb-4">
        DagjeUtrecht is een handelsnaam van Handelsonderneming Manders (KvK 63330393). Op alle
        aanvragen en offertes zijn onze algemene voorwaarden van toepassing.
      </p>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Betaling</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>50% aanbetaling bij bevestiging van de offerte</li>
        <li>Restant 12 weken vóór vertrek</li>
        <li>Bij bevestiging binnen 12 weken: volledige betaling bij bevestiging</li>
      </ul>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Annulering</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Meer dan 8 weken vooraf: 25% van de reissom</li>
        <li>4-8 weken vooraf: 50% van de reissom</li>
        <li>2-4 weken vooraf: 75% van de reissom</li>
        <li>Minder dan 2 weken vooraf: 100% van de reissom</li>
      </ul>

      <p className="mt-8 text-sm text-canal-600">
        De volledige voorwaarden versturen we bij elke offerte. Vragen? Bel of mail Ger.
      </p>
    </main>
  );
}
