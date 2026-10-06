import { VertaaldeLandingPagina, landingMetadataIn } from '../../../components/vertaald/landing';

export const metadata = landingMetadataIn('en', 'teambuilding');

export const revalidate = 86400;

export default function Page() {
  return <VertaaldeLandingPagina taal="en" sleutel="teambuilding" />;
}
