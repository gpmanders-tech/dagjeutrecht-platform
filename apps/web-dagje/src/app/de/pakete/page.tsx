import { PakkettenOverzicht, pakkettenMetadata } from '../../../components/vertaald/pakketten';

export const metadata = pakkettenMetadata('de');

export const revalidate = 86400;

export default function Page() {
  return <PakkettenOverzicht taal="de" />;
}
