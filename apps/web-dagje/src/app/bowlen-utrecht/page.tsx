import { OpAanvraagPagina, opAanvraagMetadata } from '../../components/op-aanvraag-pagina';

export const metadata = opAanvraagMetadata('bowlen-utrecht');

export default function Page() {
  return <OpAanvraagPagina slug="bowlen-utrecht" />;
}
