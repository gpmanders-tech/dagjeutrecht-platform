import { Home, homeMetadata } from '../../components/vertaald/home';

export const metadata = homeMetadata('en');

export const revalidate = 86400;

export default function Page() {
  return <Home taal="en" />;
}
