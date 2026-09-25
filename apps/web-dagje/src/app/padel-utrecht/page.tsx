import { OpAanvraagPagina, opAanvraagMetadata } from '../../components/op-aanvraag-pagina';

export const metadata = opAanvraagMetadata('padel-utrecht');

export default function Page() {
  return <OpAanvraagPagina slug="padel-utrecht" />;
}
