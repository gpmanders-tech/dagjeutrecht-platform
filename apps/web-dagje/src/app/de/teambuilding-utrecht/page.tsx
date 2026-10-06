import { VertaaldeLandingPagina, landingMetadataIn } from '../../../components/vertaald/landing';

export const metadata = landingMetadataIn('de', 'teambuilding');

export const revalidate = 86400;

export default function Page() {
  return <VertaaldeLandingPagina taal="de" sleutel="teambuilding" />;
}
