/** Haalt og:image of twitter:image van een URL. Server-side. */
export async function fetchOgImage(pageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; UtrechtNowBot/1.0; +https://utrechtnow.nl)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const html = await res.text();

    const candidates = [
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i,
      /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
      /<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i,
      /<meta\s+property=["']og:image:url["']\s+content=["']([^"']+)["']/i,
    ];
    for (const re of candidates) {
      const m = html.match(re);
      if (m && m[1]) {
        let url = m[1];
        if (url.startsWith('//')) url = `https:${url}`;
        else if (url.startsWith('/')) {
          const base = new URL(pageUrl);
          url = `${base.origin}${url}`;
        }
        return url;
      }
    }
    return null;
  } catch {
    return null;
  }
}
