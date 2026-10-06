/**
 * Keuzefouten in het Engels of Duits. Los bestand zonder vertalingen erin, zodat
 * het boekformulier (client) het kan gebruiken zonder alle teksten mee te laden.
 */
import type { KeuzeFout } from '../aanbod';
import { maandenIn } from './opmaak';
import type { FormulierNamen, FormulierTekst } from './types';
import { vul } from './vul';

/**
 * Een keuzefout in de taal van de bezoeker. Draait in de browser (via de namen en
 * teksten die het formulier als props krijgt) en op de server, met dezelfde uitkomst.
 */
export function foutTekstMet(
  fouten: FormulierTekst['fouten'],
  namen: FormulierNamen,
  f: KeuzeFout,
): string {
  const blok = (slug: string) => namen.bouwstenen[slug]?.naam ?? slug;
  const tijdvak = (id: keyof FormulierNamen['tijdvakken']) =>
    namen.tijdvakKlein ? namen.tijdvakken[id].toLowerCase() : namen.tijdvakken[id];
  switch (f.code) {
    case 'te-kort-vooruit':
      return vul(fouten[f.code], { dagen: f.dagen });
    case 'aantal':
      return vul(fouten.aantal, { min: f.min, max: f.max });
    case 'onbekend-onderdeel':
      return vul(fouten[f.code], { tijdvak: tijdvak(f.tijdvak) });
    case 'verkeerd-tijdvak':
      return vul(fouten[f.code], { blok: blok(f.blok), tijdvak: tijdvak(f.tijdvak) });
    case 'aantal-blok':
      return vul(fouten[f.code], { blok: blok(f.blok), min: f.min, max: f.max });
    case 'seizoen':
      return vul(fouten.seizoen, {
        blok: blok(f.blok),
        maanden: maandenIn(namen.maanden, namen.maandenSjabloon, f.seizoen),
      });
    case 'kickbike-nodig':
      return vul(fouten[f.code], { van: namen.clusters[f.van], naar: namen.clusters[f.naar] });
    default:
      return fouten[f.code];
  }
}
