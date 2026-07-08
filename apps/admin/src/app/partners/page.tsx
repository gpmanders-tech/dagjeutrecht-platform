import { prisma } from '@utrecht/db';
import { Badge, Button } from '@utrecht/ui';
import { approvePartner, rejectPartner } from '@/app/actions/partner';

export const revalidate = 10;

const TONE: Record<string, 'tip' | 'success' | 'default' | 'accent'> = {
  PENDING: 'tip',
  APPROVED: 'success',
  SUSPENDED: 'default',
  REJECTED: 'accent',
};

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  });

  const pending = partners.filter((p) => p.status === 'PENDING');
  const others = partners.filter((p) => p.status !== 'PENDING');

  return (
    <div>
      <h1 className="font-serif text-3xl mb-6 text-canal-900">B2B-partners</h1>

      {pending.length > 0 && (
        <section className="mb-10">
          <h2 className="font-serif text-xl mb-3 text-canal-900">
            Wachtend op goedkeuring ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-canal-100 shadow-soft p-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-serif text-lg text-canal-900">{p.companyName}</p>
                    <p className="text-sm text-canal-600">
                      {p.contactName} · {p.email} {p.phone && `· ${p.phone}`}
                    </p>
                    <p className="text-xs text-canal-500 mt-1">
                      {p.country} {p.vatNumber && `· BTW ${p.vatNumber}`} · aangemeld {p.createdAt.toLocaleDateString('nl-NL')}
                    </p>
                    {p.notes && (
                      <p className="text-sm text-canal-700 mt-3 bg-canal-50 p-3 rounded-md">{p.notes}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <form action={approvePartner}>
                      <input type="hidden" name="id" value={p.id} />
                      <Button type="submit" size="sm">✓ Goedkeuren</Button>
                    </form>
                    <form action={rejectPartner}>
                      <input type="hidden" name="id" value={p.id} />
                      <Button type="submit" size="sm" variant="outline">✗ Afwijzen</Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-serif text-xl mb-3 text-canal-900">Overzicht ({others.length})</h2>
        <div className="bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-canal-50 text-left text-canal-700">
              <tr>
                <th className="px-4 py-3">Bedrijf</th>
                <th className="px-4 py-3">Land</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Sinds</th>
              </tr>
            </thead>
            <tbody>
              {others.map((p) => (
                <tr key={p.id} className="border-t border-canal-100">
                  <td className="px-4 py-2 text-canal-900">{p.companyName}</td>
                  <td className="px-4 py-2">{p.country}</td>
                  <td className="px-4 py-2 text-canal-700">{p.email}</td>
                  <td className="px-4 py-2"><Badge tone={TONE[p.status]}>{p.status}</Badge></td>
                  <td className="px-4 py-2 text-canal-500 text-xs">{p.createdAt.toLocaleDateString('nl-NL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {others.length === 0 && <p className="text-center py-10 text-canal-500">Nog geen goedgekeurde partners.</p>}
        </div>
      </section>
    </div>
  );
}
