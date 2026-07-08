'use client';

import { useState, useTransition } from 'react';
import { Button } from '@utrecht/ui';
import { requestModification } from '@/app/actions/customer-portal';

export function ModifyItemForm({
  orderItemId,
  currentScheduledAt,
  currentParticipants,
  canChangeTime,
  canChangeCount,
  modifyDeadlineHours,
}: {
  orderItemId: string;
  currentScheduledAt: string;
  currentParticipants: number;
  canChangeTime: boolean;
  canChangeCount: boolean;
  modifyDeadlineHours: number;
}) {
  const [open, setOpen] = useState(false);
  const [scheduledAt, setScheduledAt] = useState(currentScheduledAt.slice(0, 16));
  const [participants, setParticipants] = useState(currentParticipants);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const fd = new FormData();
    fd.set('orderItemId', orderItemId);
    if (canChangeTime && scheduledAt !== currentScheduledAt.slice(0, 16)) {
      fd.set('newScheduledAt', new Date(scheduledAt).toISOString());
    }
    if (canChangeCount && participants !== currentParticipants) {
      fd.set('newParticipants', String(participants));
    }
    startTransition(async () => {
      const res = await requestModification(fd);
      if (res && 'error' in res) setMsg(res.error);
      else {
        setMsg('✓ Wijziging doorgegeven');
        setOpen(false);
      }
    });
  }

  if (!canChangeTime && !canChangeCount) {
    return <p className="text-xs text-canal-500 mt-1">Wijzigen niet ondersteund door deze leverancier.</p>;
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-xs text-terracotta-600 hover:underline mt-2">
        ✎ Wijzig (tot {modifyDeadlineHours}u vooraf)
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3 p-3 bg-canal-50 rounded-md space-y-2">
      {canChangeTime && (
        <div>
          <label className="text-xs text-canal-700 block mb-1">Nieuw moment</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="h-9 w-full rounded border border-canal-200 px-2 text-sm"
          />
        </div>
      )}
      {canChangeCount && (
        <div>
          <label className="text-xs text-canal-700 block mb-1">Aantal personen</label>
          <input
            type="number"
            min={1}
            value={participants}
            onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
            className="h-9 w-full rounded border border-canal-200 px-2 text-sm"
          />
        </div>
      )}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>{pending ? '…' : 'Doorgeven'}</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setOpen(false)}>Annuleer</Button>
      </div>
      {msg && <p className={`text-xs ${msg.startsWith('✓') ? 'text-emerald-700' : 'text-red-700'}`}>{msg}</p>}
    </form>
  );
}
