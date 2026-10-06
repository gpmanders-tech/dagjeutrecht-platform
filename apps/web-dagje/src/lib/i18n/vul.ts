/** Vult {naam}-plekken in een tekst in. Klein gehouden: het boekformulier (client) gebruikt het ook. */
export function vul(sjabloon: string, waarden: Record<string, string | number>) {
  return sjabloon.replace(/\{(\w+)\}/g, (heel, sleutel: string) =>
    sleutel in waarden ? String(waarden[sleutel]) : heel,
  );
}
