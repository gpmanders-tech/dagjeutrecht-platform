import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@utrecht/db';
import { LANDING_LIJST } from '../../lib/landings';
import { Breadcrumbs } from '../../components/seo-jsonld';

export const metadata: Metadata = {
  title: 'Inspiratie voor een dagje Utrecht',
  description:
    'Verhalen en tips over uitjes in Utrecht: waar je het beste kunt kanoën, jeu de boulen of borrelen, en hoe je er een compleet dagprogramma van maakt.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'DagjeUtrecht',
    title: 'Inspiratie voor een dagje Utrecht met je groep',
    description: 'Tips over uitjes in Utrecht: kanoën, jeu de boulen, borrelen en er een compleet dagprogramma van maken.',
    url: '/blog',
    images: [{ url: '/og-image.png', width: 1200, height: 600, alt: 'DagjeUtrecht, dagprogramma’s in Utrecht' }],
  },
};

export const revalidate = 300;

export default async function BlogIndex() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { domain: 'DAGJEUTRECHT', locale: 'nl', published: true },
      orderBy: { publishedAt: 'desc' },
      take: 30,
    });
  } catch (e) {
    console.error('blog list DB fetch failed:', e);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Inspiratie', url: '/blog' },
        ]}
      />
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-3">Inspiratie</h1>
      <p className="text-inkt mb-4 max-w-2xl">
        Ideeën, tips en verhalen voor jullie dag Utrecht.
      </p>
      <p className="text-grijs mb-4 max-w-2xl">
        Hier lees je waar je in Utrecht het best kunt kanoën of suppen, waarom jeu de boules en shuffleboard zo goed werken
        voor een groep, en hoe je van losse activiteiten een dag maakt die klopt: van de ontvangst met koffie tot de borrel
        aan het eind. Elk artikel verwijst naar de pakketten die erbij passen, zodat je van idee meteen naar een datum kunt.
      </p>
      <p className="text-grijs mb-4 max-w-2xl">
        Weet je al wat voor uitje het wordt? Ga dan direct naar de pagina voor jullie gelegenheid:{' '}
        {LANDING_LIJST.map((l, i) => (
          <span key={l.pad}>
            {i > 0 && (i === LANDING_LIJST.length - 1 ? ' of ' : ', ')}
            <Link href={l.pad} className="font-bold text-inkt underline decoration-vlam-400 decoration-2 underline-offset-4">
              {l.link.toLowerCase()}
            </Link>
          </span>
        ))}
        .
      </p>
      <p className="text-grijs mb-10 max-w-2xl">
        Of lees eerst meer over een activiteit:{' '}
        {[
          { href: '/bouwstenen/kanoen', label: 'kanoën in Amelisweerd' },
          { href: '/bouwstenen/suppen', label: 'suppen op de Kromme Rijn' },
          { href: '/bouwstenen/jeu-de-boules', label: 'jeu de boules aan Paardenveld' },
          { href: '/bouwstenen/shuffleboard', label: 'shuffleboard in The Grand Shuffle' },
          { href: '/bouwstenen/city-challenge', label: 'de City Challenge door de binnenstad' },
          { href: '/bouwstenen/rondvaart', label: 'een rondvaart door de grachten' },
        ].map((x, i, rij) => (
          <span key={x.href}>
            {i > 0 && (i === rij.length - 1 ? ' of ' : ', ')}
            <Link href={x.href} className="font-bold text-inkt underline decoration-zee-400 decoration-2 underline-offset-4">
              {x.label}
            </Link>
          </span>
        ))}
        . Alle activiteiten zijn voor groepen vanaf 8 personen, met een vaste prijs per persoon.
      </p>

      {posts.length === 0 ? (
        <p className="text-grijs">Nog geen artikelen gepubliceerd. Kom binnenkort terug.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="block bg-white rounded-2xl overflow-hidden shadow-xl border border-inkt/10 hover:border-vlam-400 transition-colors"
            >
              {p.heroImage && (
                <img src={p.heroImage} alt={p.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-5">
                <h2 className="text-xl font-extrabold text-inkt">{p.title}</h2>
                {p.excerpt && (
                  <p className="text-grijs text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
