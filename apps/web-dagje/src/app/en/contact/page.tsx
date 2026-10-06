import { Contact, contactMetadata } from '../../../components/vertaald/paginas';

export const metadata = contactMetadata('en');

export default function Page() {
  return <Contact taal="en" />;
}
