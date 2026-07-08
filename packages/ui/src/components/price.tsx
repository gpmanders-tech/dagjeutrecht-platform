import { formatEuro } from '../lib/format';

/**
 * Toont uitsluitend de eindprijs aan de klant.
 * Marge wordt door booking-engine berekend; deze component noemt geen "marge" of "servicekosten".
 */
export function Price({
  cents,
  perPerson,
  from,
  locale = 'nl-NL',
  label,
}: {
  cents: number;
  perPerson?: boolean;
  from?: boolean;
  locale?: string;
  label?: { from?: string; perPerson?: string };
}) {
  return (
    <span className="font-medium text-canal-900">
      {from && <span className="text-canal-600 text-sm mr-1">{label?.from ?? 'Vanaf'}</span>}
      {formatEuro(cents, locale)}
      {perPerson && <span className="text-canal-600 text-sm ml-1">{label?.perPerson ?? 'p.p.'}</span>}
    </span>
  );
}
