import { PakkettenOverzicht, pakkettenMetadata } from '../../../components/vertaald/pakketten';

export const metadata = pakkettenMetadata('en');

export const revalidate = 86400;

export default function Page() {
  return <PakkettenOverzicht taal="en" />;
}
