import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { formatEuro } from '@utrecht/ui';

export default async function VoucherPage({ params: { code } }: { params: { code: string } }) {
  const voucher = await prisma.voucher.findUnique({
    where: { code },
    include: {
      orderItem: { include: { product: { include: { provider: true } } } },
      order: true,
    },
  });
  if (!voucher) notFound();

  const qrDataUrl = await QRCode.toDataURL(voucher.qrPayload || voucher.code, {
    margin: 1,
    width: 220,
    color: { dark: '#1E3A4A', light: '#FFFFFF' },
  });

  const it = voucher.orderItem;
  const provider = it.product.provider;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 print:py-0">
      <div className="bg-white border border-canal-200 rounded-2xl shadow-soft p-8 print:shadow-none print:border-0">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="font-serif text-2xl text-canal-900">Utrecht <span className="text-terracotta">Now</span></p>
            <p className="text-xs text-canal-500">Boekingsnummer {voucher.order.publicCode}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            voucher.status === 'REDEEMED' ? 'bg-emerald-100 text-emerald-800' :
            voucher.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
            'bg-canal-100 text-canal-800'
          }`}>{voucher.status}</span>
        </div>

        <h1 className="font-serif text-3xl text-canal-900 mb-2">{provider.name}</h1>
        <p className="text-canal-600 mb-6">
          {it.participants === 1 ? '1 persoon' : `${it.participants} personen`} ·{' '}
          {it.scheduledAt?.toLocaleString('nl-NL', { dateStyle: 'long', timeStyle: 'short' })}
        </p>

        <div className="flex items-center justify-between gap-6 py-6 border-y border-canal-100">
          <div className="flex-1">
            <p className="text-sm text-canal-500 mb-1">Vouchercode</p>
            <p className="font-mono text-2xl text-canal-900 tracking-wide">{voucher.code}</p>
            {voucher.validFrom && (
              <p className="text-xs text-canal-500 mt-3">
                Geldig vanaf {voucher.validFrom.toLocaleDateString('nl-NL')}
              </p>
            )}
          </div>
          <img src={qrDataUrl} alt="QR code" className="w-32 h-32" />
        </div>

        <div className="mt-6 text-sm text-canal-700 space-y-1">
          <p><strong>Adres:</strong> {provider.addressLine || provider.name + ', Utrecht'}</p>
          <p><strong>Toon dit voucher bij aankomst.</strong> Vermeld het boekingsnummer indien gevraagd.</p>
        </div>

        <div className="mt-8 pt-6 border-t border-canal-100 flex justify-between text-xs text-canal-500">
          <span>utrechtnow.nl</span>
          <span>Uitgegeven {voucher.issuedAt.toLocaleDateString('nl-NL')}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-3 print:hidden">
        <button
          onClick={() => typeof window !== 'undefined' && window.print()}
          className="px-5 h-11 rounded-md bg-canal text-white text-sm hover:bg-canal-700"
        >
          🖨️ Print / opslaan als PDF
        </button>
      </div>
    </div>
  );
}
