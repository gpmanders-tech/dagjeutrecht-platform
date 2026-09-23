import { LandingPagina, landingMetadata } from '../../components/landing-pagina';
import { LANDINGS } from '../../lib/landings';

export const metadata = landingMetadata(LANDINGS.personeelsuitje);

export const revalidate = 86400;

export default function Page() {
  return <LandingPagina landing={LANDINGS.personeelsuitje} />;
}
