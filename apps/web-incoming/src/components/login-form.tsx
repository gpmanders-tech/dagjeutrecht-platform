'use client';

import { useState, useTransition } from 'react';
import { Button, Input } from '@utrecht/ui';
import { login } from '@/app/actions/login';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await login(email);
      if ('error' in result) setError(result.error);
      else router.push('/katalog');
    });
  }

  return (
    <form onSubmit={submit} className="bg-white text-canal-900 rounded-2xl p-6 space-y-3">
      <div>
        <label className="text-sm text-canal-700 block mb-1">E-Mail</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {error && <p className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</p>}
      <Button type="submit" variant="incoming" size="lg" className="w-full" disabled={pending || !email}>
        {pending ? 'Bitte warten…' : 'Einloggen'}
      </Button>
    </form>
  );
}
