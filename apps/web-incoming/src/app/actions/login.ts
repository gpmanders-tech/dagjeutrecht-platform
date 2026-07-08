'use server';

import { prisma } from '@utrecht/db';
import { setSession, clearSession } from '@/lib/session';

export async function login(email: string) {
  const partner = await prisma.partner.findUnique({ where: { email } });
  if (!partner) return { error: 'Kein Account mit dieser E-Mail gefunden.' };
  if (partner.status === 'PENDING') return { error: 'Ihre Anfrage wird noch geprüft.' };
  if (partner.status !== 'APPROVED') return { error: 'Account nicht aktiv. Bitte kontaktieren Sie uns.' };

  await setSession(partner.id);
  return { ok: true };
}

export async function logout() {
  await clearSession();
}
