import { Contact, contactMetadata } from '../../../components/vertaald/paginas';

export const metadata = contactMetadata('de');

export default function Page() {
  return <Contact taal="de" />;
}
