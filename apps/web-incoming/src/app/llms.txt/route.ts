import { SITE_URL } from '@/lib/site';

/** llms.txt: kurze, sachliche Zusammenfassung für KI-Suchmaschinen. */
export const dynamic = 'force-static';

export function GET() {
  const text = [
    '# Utrecht Incoming',
    '',
    '> B2B-Incoming-Partner für Gruppenreisen nach Utrecht (Niederlande). Für Reiseveranstalter, DMC, Busunternehmen und Schulreise-Spezialisten. Deutschsprachig.',
    '',
    'Partner registrieren sich mit ihren Firmendaten; jede Anfrage wird innerhalb von 2 Werktagen manuell geprüft. Danach sehen sie im Partnerportal Partnertarife (netto, ohne Endkundenmarge). Buchungen werden manuell bei den Anbietern bestätigt. Vouchers als PDF in 7 Sprachen, auf Wunsch mit eigenem Logo. Sammelrechnung pro Monat.',
    '',
    '## Seiten',
    '',
    `- [Startseite](${SITE_URL}/): Gruppenreise nach Utrecht, Arbeitsweise und häufige Fragen`,
    `- [Gruppenprogramme und Tagesausflüge](${SITE_URL}/gruppenprogramme): Domturm, Grachtenrundfahrt, Jeu de Boules, Shuffleboard, City Challenge, Kanu und SUP in Amelisweerd, Beispielprogramme`,
    `- [Busreise nach Utrecht](${SITE_URL}/busreise-utrecht): Anreise, Tagesablauf und Programmideen für Busgruppen`,
    `- [Als Partner registrieren](${SITE_URL}/registrieren)`,
    '',
    'Niederländischsprachige Tagesausflüge für Gruppen in Utrecht: https://dagjeutrecht.nl',
    '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
