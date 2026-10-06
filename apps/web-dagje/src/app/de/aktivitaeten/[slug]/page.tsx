import {
  BouwsteenDetail,
  bouwsteenMetadata,
  bouwsteenParams,
} from '../../../../components/vertaald/bouwstenen';

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return bouwsteenParams('de');
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return bouwsteenMetadata('de', params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BouwsteenDetail taal="de" slug={params.slug} />;
}
