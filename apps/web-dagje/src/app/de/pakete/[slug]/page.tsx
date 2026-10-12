import {
  PakketDetail,
  pakketMetadata,
  pakketParams,
} from '../../../../components/vertaald/pakketten';

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return pakketParams('de');
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return pakketMetadata('de', params.slug);
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <PakketDetail taal="de" slug={params.slug} />;
}
