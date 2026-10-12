import {
  BouwsteenDetail,
  bouwsteenMetadata,
  bouwsteenParams,
} from '../../../../components/vertaald/bouwstenen';

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return bouwsteenParams('en');
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return bouwsteenMetadata('en', params.slug);
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <BouwsteenDetail taal="en" slug={params.slug} />;
}
