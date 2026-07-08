import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import { updateStatus, addNote } from '../../actions/enquiry';

export const dynamic = 'force-dynamic';

export default async function EnquiryDetail({ params }: { params: { id: string } }) {
  const e = await prisma.enquiry.findUnique({
    where: { id: params.id },
    include: {
      items: { include: { provider: true }, orderBy: { order: 'asc' } },
      notes: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!e) notFound();

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <p className="text-canal-500 text-sm font-mono">{e.publicCode}</p>
        <h1 className="font-serif text-3xl text-canal-900">
          {e.contactName} — {e.paxAdults + e.paxChildren} pax
        </h1>
        <p className="text-canal-600 mt-1">
          {e.channel === 'DAGJE' ? 'DagjeUtrecht.nl' : 'UtrechtIncoming.nl'} · {formatDate(e.createdAt)}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg bg-white border border-canal-100 p-5">
          <h2 className="font-semibold text-canal-800 mb-3">Contact</h2>
          <dl className="text-sm space-y-1 text-canal-700">
            <Row k="E-mail" v={e.contactEmail} />
            <Row k="Telefoon" v={e.contactPhone} />
            <Row k="Bedrijf" v={e.companyName} />
            <Row k="BTW" v={e.vatNumber} />
            <Row k="Land" v={e.country} />
          </dl>
        </div>
        <div className="rounded-lg bg-white border border-canal-100 p-5">
          <h2 className="font-semibold text-canal-800 mb-3">Aanvraag</h2>
          <dl className="text-sm space-y-1 text-canal-700">
            <Row k="Datum" v={e.requestedDate?.toLocaleDateString('nl-NL')} />
            <Row k="Doelgroep" v={e.audience} />
            <Row k="Aantal" v={`${e.paxAdults} volw + ${e.paxChildren} kind`} />
            <Row
              k="Budget"
              v={
                e.budgetMinCents || e.budgetMaxCents
                  ? `€${(e.budgetMinCents ?? 0) / 100} - €${(e.budgetMaxCents ?? 0) / 100} p.p.`
                  : undefined
              }
            />
          </dl>
        </div>
      </div>

      {e.message && (
        <div className="mb-8 rounded-lg bg-cream/50 p-5 text-canal-800">
          <h2 className="font-semibold mb-2">Wensen</h2>
          <p className="whitespace-pre-wrap">{e.message}</p>
        </div>
      )}

      <h2 className="font-serif text-2xl text-canal-900 mb-3">Programma</h2>
      <ol className="space-y-2 mb-8">
        {e.items.map((it) => (
          <li key={it.id} className="rounded-lg bg-white border border-canal-100 p-4 flex justify-between">
            <div>
              <p className="text-xs text-canal-500">Stop {it.order + 1} {it.scheduledTime ? `· ${it.scheduledTime}` : ''}</p>
              <p className="font-medium text-canal-900">{it.provider.name}</p>
              {it.provider.contactEmail && (
                <p className="text-xs text-canal-500">{it.provider.contactEmail}</p>
              )}
            </div>
            <div className="text-right text-sm text-canal-700">
              <p>{it.pax} pax</p>
              {it.costPriceCents && <p>inkoop: €{(it.costPriceCents / 100).toFixed(2)}</p>}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="font-serif text-2xl text-canal-900 mb-3">Status & werkflow</h2>
      <form action={updateStatus} className="flex gap-2 mb-6">
        <input type="hidden" name="id" value={e.id} />
        <select name="status" defaultValue={e.status} className="rounded-lg border border-canal-200 px-3 py-2">
          {['NEW', 'IN_PROGRESS', 'QUOTED', 'WON', 'LOST'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="submit" className="rounded-full bg-canal-900 hover:bg-canal-800 text-white px-4 py-2 text-sm">
          Update status
        </button>
      </form>

      <h2 className="font-serif text-2xl text-canal-900 mb-3">Notities</h2>
      <form action={addNote} className="mb-4">
        <input type="hidden" name="id" value={e.id} />
        <textarea
          name="body"
          rows={3}
          placeholder="Notitie toevoegen…"
          required
          className="w-full rounded-lg border border-canal-200 px-3 py-2 mb-2"
        />
        <button type="submit" className="rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white px-4 py-2 text-sm">
          Notitie opslaan
        </button>
      </form>
      <ul className="space-y-3">
        {e.notes.map((n) => (
          <li key={n.id} className="rounded-lg bg-white border border-canal-100 p-3 text-sm">
            <p className="text-canal-500 text-xs">{n.author} · {formatDate(n.createdAt)}</p>
            <p className="mt-1 whitespace-pre-wrap text-canal-800">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string | null }) {
  if (!v) return null;
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-canal-500">{k}</dt>
      <dd className="text-canal-800">{v}</dd>
    </div>
  );
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d);
}
