import { Betaald, betaaldMetadata } from '../../../components/vertaald/paginas';

export const metadata = betaaldMetadata('en');

export default async function Page(props: { searchParams: Promise<{ code?: string }> }) {
  const searchParams = await props.searchParams;
  return <Betaald taal="en" code={searchParams.code} />;
}
