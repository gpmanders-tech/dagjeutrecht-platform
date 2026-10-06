import { Boeken, boekenMetadata } from '../../../components/vertaald/paginas';

export const metadata = boekenMetadata('en');

export default function Page({ searchParams }: { searchParams: { pakket?: string } }) {
  return <Boeken taal="en" pakket={searchParams.pakket} />;
}
