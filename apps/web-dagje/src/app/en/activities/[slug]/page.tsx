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

export function generateMetadata({ params }: { params: { slug: string } }) {
  return bouwsteenMetadata('en', params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BouwsteenDetail taal="en" slug={params.slug} />;
}
