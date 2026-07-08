import { randomBytes } from 'crypto';

/** UN-2026-00042 stijl ordercode (per domein). */
export function generateOrderCode(domain: 'UN' | 'DJ' | 'NU' | 'UI', year = new Date().getFullYear()) {
  const rand = parseInt(randomBytes(3).toString('hex'), 16).toString().padStart(5, '0').slice(-5);
  return `${domain}-${year}-${rand}`;
}

/** Unieke voucher-code: bv. UN-AB12-CD34-EF56 */
export function generateVoucherCode(prefix = 'UN') {
  const seg = () => randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${seg()}-${seg()}-${seg()}`;
}

/** QR-payload (deeplink naar inwissel/verificatie-route). */
export function voucherQrPayload(code: string, host = 'https://utrechtnow.nl') {
  return `${host}/v/${code}`;
}
