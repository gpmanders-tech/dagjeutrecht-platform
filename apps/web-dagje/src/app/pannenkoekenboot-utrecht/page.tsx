import { OpAanvraagPagina, opAanvraagMetadata } from '../../components/op-aanvraag-pagina';

export const metadata = opAanvraagMetadata('pannenkoekenboot-utrecht');

export default function Page() {
  return <OpAanvraagPagina slug="pannenkoekenboot-utrecht" />;
}
