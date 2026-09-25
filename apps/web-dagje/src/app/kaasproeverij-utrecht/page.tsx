import { OpAanvraagPagina, opAanvraagMetadata } from '../../components/op-aanvraag-pagina';

export const metadata = opAanvraagMetadata('kaasproeverij-utrecht');

export default function Page() {
  return <OpAanvraagPagina slug="kaasproeverij-utrecht" />;
}
