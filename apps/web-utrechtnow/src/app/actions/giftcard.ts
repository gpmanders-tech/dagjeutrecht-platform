'use server';

import { applyGiftcardToOrder, validateGiftcard } from '@/lib/giftcards';
import { revalidatePath } from 'next/cache';

export async function checkGiftcardCode(code: string) {
  return validateGiftcard(code.trim().toUpperCase());
}

export async function redeemGiftcardOnOrder(formData: FormData) {
  const orderId = formData.get('orderId') as string;
  const code = (formData.get('code') as string)?.trim().toUpperCase();
  if (!orderId || !code) return { error: 'Vul een code in.' };
  const result = await applyGiftcardToOrder(orderId, code);
  revalidatePath(`/checkout/${orderId}`);
  return result;
}
