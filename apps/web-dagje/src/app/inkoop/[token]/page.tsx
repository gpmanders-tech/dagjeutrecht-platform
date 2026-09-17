import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@utrecht/db';
import { LEVERANCIERS, TIJDVAKKEN, formatDatum, vindBouwsteen, type LeverancierId } from '../../../lib/aanbod';
import { verwerkAntwoord } from '../../../lib/inkoop-agent';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Bestelling bevestigen', robots: { index: false, follow: false } };

async function beantwoord(fd: FormData) {
  'use server';
  const token = String(fd.get('token') || '');
  const akkoord = fd.get('antwoord') === 'ja';
  const opmerking = String(fd.get('opmerking') || '').trim() || undefined;
  await verwerkAntwoord(token, akkoord, opmerking);
  redirect(`/inkoop/${token}?klaar=1`);
}

export default async function InkoopPage({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { klaar?: string };
}) {
  const orders = await prisma.inkooporder.findMany({
    where: { token: params.token },
    include: { enquiry: { select: { publicCode: true } } },
  });
  if (orders.length === 0) notFound();

  const eerste = orders[0]!;
  const lev = LEVERANCIERS[eerste.leverancier as LeverancierId]?.naam ?? eerste.leverancier;
  const volgorde = (t: string) => TIJDVAKKEN.findIndex((x) => x.id === t);
  const gesorteerd = [...orders].sort((a, b) => volgorde(a.tijdvak) - volgorde(b.tijdvak));
  const open = orders.some((o) => o.status === 'VERSTUURD' || o.status === 'TE_VERSTUREN');
  const code = eerste.enquiry.publicCode.slice(-6).toUpperCase();

  return (
    <main className="max-w-xl mx-auto px-6 py-14 text-inkt">
      <p className="text-sm text-grijs mb-1">Bestelling {code} voor {lev}</p>
      <h1 className="text-3xl font-black uppercase tracking-tight text-inkt mb-6">
        {formatDatum(eerste.datum.toISOString().slice(0, 10))}
      </h1>

      <ul className="space-y-2 mb-8">
        {gesorteerd.map((o) => (
          <li key={o.id} className="rounded-xl border border-inkt/10 bg-white p-4">
            <p className="font-medium text-inkt">{vindBouwsteen(o.bouwsteen)?.naam ?? o.bouwsteen}</p>
            <p className="text-sm text-grijs">
              {o.van} tot {o.tot} · {o.personen} personen
            </p>
            {o.status === 'BEVESTIGD' && <p className="text-sm text-emerald-700 mt-1">Bevestigd</p>}
            {o.status === 'AFGEWEZEN' && <p className="text-sm text-red-700 mt-1">Niet mogelijk</p>}
          </li>
        ))}
      </ul>

      {searchParams.klaar && (
        <p className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 mb-6">
          Dank je wel, je antwoord is verwerkt.
        </p>
      )}

      {open ? (
        <form action={beantwoord} className="space-y-4">
          <input type="hidden" name="token" value={params.token} />
          <label className="block">
            <span className="text-sm">Opmerking (optioneel, bijvoorbeeld een ander tijdstip)</span>
            <textarea
              name="opmerking"
              rows={3}
              maxLength={1000}
              className="mt-1 w-full rounded-lg border border-inkt/10 px-3 py-2"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              name="antwoord"
              value="ja"
              className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 font-medium"
            >
              Bevestigen
            </button>
            <button
              name="antwoord"
              value="nee"
              className="rounded-full border border-inkt/10 hover:border-red-500 hover:text-red-700 px-6 py-3 font-medium"
            >
              Kan helaas niet
            </button>
          </div>
        </form>
      ) : (
        !searchParams.klaar && <p className="text-grijs">Deze bestelling is al beantwoord.</p>
      )}

      <p className="text-xs text-grijs mt-10">
        Vragen? Bel Ger Manders van DagjeUtrecht.nl: 030 227 14 39.
      </p>
    </main>
  );
}
