import { LandingPagina, landingMetadata } from '../../components/landing-pagina';
import { LANDINGS } from '../../lib/landings';

export const metadata = landingMetadata(LANDINGS.vrijgezellenfeest);

export default function Page() {
  return <LandingPagina landing={LANDINGS.vrijgezellenfeest} />;
}
