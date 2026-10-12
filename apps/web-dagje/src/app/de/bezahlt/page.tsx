import { Betaald, betaaldMetadata } from '../../../components/vertaald/paginas';

export const metadata = betaaldMetadata('de');

export default async function Page(props: { searchParams: Promise<{ code?: string }> }) {
  const searchParams = await props.searchParams;
  return <Betaald taal="de" code={searchParams.code} />;
}
