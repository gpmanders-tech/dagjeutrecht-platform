/**
 * WeFact API v2 — debtor + invoice (en pricequote indien nodig).
 * Auth: POST body `api_key`.
 */
const BASE = process.env.WEFACT_BASE_URL ?? 'https://api.mijnwefact.nl/v2/';
const KEY = () => {
  const k = process.env.WEFACT_API_KEY;
  if (!k) throw new Error('WEFACT_API_KEY ontbreekt');
  return k;
};

type ListAction = 'list' | 'add' | 'show' | 'edit';

async function call(controller: string, action: ListAction | string, params: Record<string, unknown> = {}) {
  const body = new URLSearchParams({
    api_key: KEY(),
    controller,
    action,
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)])),
  });
  const res = await fetch(BASE, { method: 'POST', body });
  if (!res.ok) throw new Error(`WeFact ${controller}.${action} ${res.status}`);
  return res.json();
}

export const debtor = {
  list: () => call('debtor', 'list'),
  show: (id: number) => call('debtor', 'show', { Identifier: id }),
  add: (data: Record<string, unknown>) => call('debtor', 'add', data),
};

export const invoice = {
  list: () => call('invoice', 'list'),
  show: (id: number) => call('invoice', 'show', { Identifier: id }),
  add: (data: Record<string, unknown>) => call('invoice', 'add', data),
  send: (id: number) => call('invoice', 'send', { Identifier: id }),
};

export const pricequote = {
  list: () => call('pricequote', 'list'),
  show: (id: number) => call('pricequote', 'show', { Identifier: id }),
  add: (data: Record<string, unknown>) => call('pricequote', 'add', data),
};
