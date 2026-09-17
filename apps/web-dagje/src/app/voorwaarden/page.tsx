import { REGELS } from '../../lib/aanbod';

export const metadata = { title: 'Voorwaarden' };

export default function VoorwaardenPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-canal-800">
      <h1 className="font-serif text-4xl text-canal-900 mb-6">Voorwaarden</h1>
      <p className="mb-4">
        DagjeUtrecht is een handelsnaam van Handelsonderneming Manders (KvK 63330393). Deze
        voorwaarden gelden voor alle boekingen via DagjeUtrecht.nl.
      </p>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Boeken</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Uitjes zijn mogelijk op donderdag, vrijdag en zaterdag, voor groepen van {REGELS.minPers}{' '}
          tot {REGELS.maxPers} personen.
        </li>
        <li>Boek minimaal {REGELS.minDagenVooruit} dagen voor de gewenste datum.</li>
        <li>
          Na je aanvraag controleren wij de beschikbaarheid bij onze partners. Binnen 2 werkdagen
          ontvang je een bevestiging met betaallink.
        </li>
        <li>De boeking is definitief zodra de betaling binnen is.</li>
        <li>
          Het programma bestaat uit vaste onderdelen op vaste tijden. Maatwerk en dieetwensen
          (behalve een vegetarische lunch) zijn niet mogelijk.
        </li>
      </ul>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Prijzen en betaling</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Alle prijzen zijn per persoon en inclusief btw.</li>
        <li>Je betaalt het volledige bedrag vooraf via de betaallink.</li>
      </ul>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Wijzigen</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Het aantal personen kan tot {REGELS.aantalDefinitiefDagenVooraf} dagen voor de datum
          worden aangepast, binnen de grenzen van het gekozen programma.
        </li>
        <li>Daarna is het aantal definitief en betaal je voor het opgegeven aantal.</li>
      </ul>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Annuleren en weer</h2>
      <p>
        Bij annuleren gelden de annuleringsvoorwaarden van de partners in jullie programma. Je
        ontvangt deze bij de bevestiging. Als een partner een onderdeel door gevaarlijk weer
        (zoals onweer of storm) niet kan laten doorgaan, nemen we contact met je op.
      </p>

      <h2 className="font-serif text-2xl text-canal-900 mt-8 mb-3">Op de dag zelf</h2>
      <p>
        De dag voor het uitje ontvang je alle tijden, adressen en een telefoonnummer waarop je ons
        die dag kunt bereiken. Deelname aan de activiteiten is op eigen risico; volg altijd de
        instructies van de partner ter plekke.
      </p>
    </main>
  );
}
