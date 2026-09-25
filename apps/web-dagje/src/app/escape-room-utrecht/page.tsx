import { OpAanvraagPagina, opAanvraagMetadata } from '../../components/op-aanvraag-pagina';

export const metadata = opAanvraagMetadata('escape-room-utrecht');

export default function Page() {
  return <OpAanvraagPagina slug="escape-room-utrecht" />;
}
