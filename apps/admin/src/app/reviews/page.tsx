import { prisma } from '@utrecht/db';
import { Badge, Button } from '@utrecht/ui';
import { Star } from 'lucide-react';
import { togglePublish } from '@/app/actions/review-mod';

export const revalidate = 10;

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const providerIds = reviews.map((r) => r.providerId).filter(Boolean) as string[];
  const providers = await prisma.provider.findMany({ where: { id: { in: providerIds } } });
  const byId = new Map(providers.map((p) => [p.id, p]));

  return (
    <div>
      <h1 className="font-serif text-3xl mb-6 text-canal-900">Reviews ({reviews.length})</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-canal-100 shadow-soft p-5">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`h-4 w-4 ${n <= r.rating ? 'fill-terracotta text-terracotta' : 'text-canal-200'}`} />
                    ))}
                  </div>
                  <Badge tone={r.published ? 'success' : 'tip'}>
                    {r.published ? 'Gepubliceerd' : 'Modereren'}
                  </Badge>
                </div>
                {r.title && <p className="font-serif text-lg text-canal-900">{r.title}</p>}
                <p className="text-sm text-canal-700 mt-1">{r.body}</p>
                <p className="text-xs text-canal-500 mt-2">
                  {r.customerName} ({r.customerEmail}) · {r.providerId && byId.get(r.providerId)?.name} · {r.createdAt.toLocaleString('nl-NL')}
                </p>
              </div>
              <form action={togglePublish}>
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="publish" value={r.published ? 'no' : 'yes'} />
                <Button type="submit" size="sm" variant={r.published ? 'outline' : 'primary'}>
                  {r.published ? 'Intrekken' : 'Publiceren'}
                </Button>
              </form>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-canal-500 text-center py-10">Geen reviews.</p>}
      </div>
    </div>
  );
}
