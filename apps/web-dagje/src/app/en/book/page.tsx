import { Boeken, boekenMetadata } from '../../../components/vertaald/paginas';

export const metadata = boekenMetadata('en');

export default async function Page(props: { searchParams: Promise<{ pakket?: string }> }) {
  const searchParams = await props.searchParams;
  return <Boeken taal="en" pakket={searchParams.pakket} />;
}
