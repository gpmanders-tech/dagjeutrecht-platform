import { Boeken, boekenMetadata } from '../../../components/vertaald/paginas';

export const metadata = boekenMetadata('de');

export default function Page({ searchParams }: { searchParams: { pakket?: string } }) {
  return <Boeken taal="de" pakket={searchParams.pakket} />;
}
