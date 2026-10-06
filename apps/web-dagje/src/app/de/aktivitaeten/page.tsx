import { BouwstenenOverzicht, bouwstenenMetadata } from '../../../components/vertaald/bouwstenen';

export const metadata = bouwstenenMetadata('de');

export const revalidate = 86400;

export default function Page() {
  return <BouwstenenOverzicht taal="de" />;
}
