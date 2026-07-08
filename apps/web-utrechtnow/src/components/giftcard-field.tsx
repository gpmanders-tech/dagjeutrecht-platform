'use client';

import { useState, useTransition } from 'react';
import { Button } from '@utrecht/ui';
import { redeemGiftcardOnOrder } from '@/app/actions/giftcard';
import { useRouter } from 'next/navigation';

export function GiftcardField({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function apply() {
    setMsg(null);
    const fd = new FormData();
    fd.set('orderId', orderId);
    fd.set('code', code);
    startTransition(async () => {
      const res = await redeemGiftcardOnOrder(fd);
      if ('error' in res) setMsg(res.error);
      else {
        setMsg(`✓ €${(res.appliedCents / 100).toFixed(2)} verrekend (restsaldo €${(res.newBalance / 100).toFixed(2)})`);
        router.refresh();
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-terracotta-600 text-sm hover:underline mt-3"
      >
        🎟️ Cadeaubon inwisselen
      </button>
    );
  }

  return (
    <div className="mt-3 p-3 bg-canal-50 rounded-md">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="GIFT-XXXX-XXXX-XXXX"
          className="flex-1 h-9 rounded border border-canal-200 px-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-canal-500"
        />
        <Button size="sm" type="button" onClick={apply} disabled={pending || !code}>
          {pending ? '…' : 'Inwisselen'}
        </Button>
      </div>
      {msg && <p className={`mt-2 text-xs ${msg.startsWith('✓') ? 'text-emerald-700' : 'text-red-700'}`}>{msg}</p>}
    </div>
  );
}
