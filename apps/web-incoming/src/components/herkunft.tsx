'use client';

import { useEffect } from 'react';

/** Merkt sich beim ersten Besuch gclid und utm-Parameter, damit eine Anfrage später der Anzeige zugeordnet werden kann. */
export function Herkunft() {
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const teile = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign'].filter((k) => p.get(k)).map((k) => `${k}=${p.get(k)}`);
      if (teile.length && !sessionStorage.getItem('herkunft')) sessionStorage.setItem('herkunft', teile.join('&'));
    } catch {}
  }, []);
  return null;
}

export function leseHerkunft() {
  try {
    return sessionStorage.getItem('herkunft') || '';
  } catch {
    return '';
  }
}
