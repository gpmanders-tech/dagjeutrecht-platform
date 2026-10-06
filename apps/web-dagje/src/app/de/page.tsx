import { Home, homeMetadata } from '../../components/vertaald/home';

export const metadata = homeMetadata('de');

export const revalidate = 86400;

export default function Page() {
  return <Home taal="de" />;
}
