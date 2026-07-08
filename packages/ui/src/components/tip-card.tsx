import { MapPin } from 'lucide-react';
import { Card, CardBody, CardTitle, CardMeta } from './card';
import { Badge } from './badge';

/** Voor providers met bookable=false. GEEN boekknop, GEEN prijs. */
export function TipCard({
  title,
  description,
  openingHours,
  websiteUrl,
  mapsUrl,
  label = 'Tip',
}: {
  title: string;
  description?: string;
  openingHours?: string;
  websiteUrl?: string;
  mapsUrl?: string;
  label?: string;
}) {
  return (
    <Card className="border-amber-200 bg-amber-50/30">
      <CardBody>
        <Badge tone="tip" className="mb-3">💡 {label}</Badge>
        <CardTitle>{title}</CardTitle>
        {description && <CardMeta className="mt-2">{description}</CardMeta>}
        {openingHours && <p className="mt-3 text-sm text-canal-700">{openingHours}</p>}
        <div className="mt-4 flex gap-4 text-sm">
          {websiteUrl && (
            <a className="text-terracotta-600 hover:underline" href={websiteUrl} target="_blank" rel="noreferrer">
              Website
            </a>
          )}
          {mapsUrl && (
            <a className="text-terracotta-600 hover:underline inline-flex items-center gap-1" href={mapsUrl} target="_blank" rel="noreferrer">
              <MapPin className="h-4 w-4" /> Op kaart
            </a>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
