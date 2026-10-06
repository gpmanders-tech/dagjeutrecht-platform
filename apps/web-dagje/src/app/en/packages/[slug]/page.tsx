import {
  PakketDetail,
  pakketMetadata,
  pakketParams,
} from '../../../../components/vertaald/pakketten';

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return pakketParams('en');
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return pakketMetadata('en', params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <PakketDetail taal="en" slug={params.slug} />;
}
