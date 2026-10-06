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

export function generateMetadata({ params }: { params: { slug: string } }) {
  return pakketMetadata('de', params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <PakketDetail taal="de" slug={params.slug} />;
}
