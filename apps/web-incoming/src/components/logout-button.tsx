'use client';

import { Button } from '@utrecht/ui';
import { logout } from '@/app/actions/login';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => { await logout(); router.push('/'); }}
      variant="outline"
      size="sm"
      className="border-white text-white hover:bg-white/10"
    >
      Abmelden
    </Button>
  );
}
