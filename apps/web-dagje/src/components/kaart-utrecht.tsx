/**
 * Kaart van de Utrechtse binnenstad, als watermerk in de hero.
 * Zelf getekend uit OpenStreetMap-data (bronvermelding staat in de footer; overgenomen van stepverhuurutrecht.nl).
 * Staat als los bestand (public/kaart-utrecht.svg) en niet meer inline: de 357
 * paden werden bij elke render meegehydrateerd door React, wat op mobiel de
 * blokkerende JS-tijd flink opdreef (DAG-04). Een <img> laadt de SVG als
 * gewone afbeelding, buiten de React-boom om.
 */
export function KaartUtrecht({ className = '' }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/kaart-utrecht.svg" alt="" aria-hidden="true" className={className} />;
}
