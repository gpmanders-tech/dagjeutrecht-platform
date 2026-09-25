import { OpAanvraagPagina, opAanvraagMetadata } from '../../components/op-aanvraag-pagina';

export const metadata = opAanvraagMetadata('boulderen-utrecht');

export default function Page() {
  return <OpAanvraagPagina slug="boulderen-utrecht" />;
}
