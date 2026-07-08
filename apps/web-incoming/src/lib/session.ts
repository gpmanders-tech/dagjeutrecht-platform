/**
 * Simpele cookie-gebaseerde partner-sessie. Voor MVP — vervang door
 * Supabase Auth of magic-link in productie.
 */
import { cookies } from 'next/headers';
import { prisma } from '@utrecht/db';

const COOKIE = 'utr_partner';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dagen

export async function setSession(partnerId: string) {
  (await cookies()).set(COOKIE, partnerId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}

export async function getPartner() {
  const id = (await cookies()).get(COOKIE)?.value;
  if (!id) return null;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner || partner.status !== 'APPROVED') return null;
  return partner;
}
