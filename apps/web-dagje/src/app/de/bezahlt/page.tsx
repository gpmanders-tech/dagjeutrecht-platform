import { Betaald, betaaldMetadata } from '../../../components/vertaald/paginas';

export const metadata = betaaldMetadata('de');

export default function Page({ searchParams }: { searchParams: { code?: string } }) {
  return <Betaald taal="de" code={searchParams.code} />;
}
