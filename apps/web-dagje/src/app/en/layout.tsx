import { VertaaldeLayout, vertaaldeLayoutMetadata } from '../../components/vertaald/layout';

export const metadata = vertaaldeLayoutMetadata('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VertaaldeLayout taal="en">{children}</VertaaldeLayout>;
}
