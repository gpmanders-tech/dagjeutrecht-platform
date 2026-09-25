import { OpAanvraagPagina, opAanvraagMetadata } from '../../components/op-aanvraag-pagina';

export const metadata = opAanvraagMetadata('pingpong-en-vr-utrecht');

export default function Page() {
  return <OpAanvraagPagina slug="pingpong-en-vr-utrecht" />;
}
