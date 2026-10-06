import { Betaald, betaaldMetadata } from '../../../components/vertaald/paginas';

export const metadata = betaaldMetadata('en');

export default function Page({ searchParams }: { searchParams: { code?: string } }) {
  return <Betaald taal="en" code={searchParams.code} />;
}
