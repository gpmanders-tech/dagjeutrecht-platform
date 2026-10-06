import { BouwstenenOverzicht, bouwstenenMetadata } from '../../../components/vertaald/bouwstenen';

export const metadata = bouwstenenMetadata('en');

export const revalidate = 86400;

export default function Page() {
  return <BouwstenenOverzicht taal="en" />;
}
