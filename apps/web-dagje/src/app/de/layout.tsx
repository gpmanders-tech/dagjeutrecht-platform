import { VertaaldeLayout, vertaaldeLayoutMetadata } from '../../components/vertaald/layout';

export const metadata = vertaaldeLayoutMetadata('de');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VertaaldeLayout taal="de">{children}</VertaaldeLayout>;
}
