'use client';

import { useEffect, useState } from 'react';

type Slide = { src: string; alt: string; caption: string };

export function HeroRotator({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="absolute inset-0">
      {slides.map((s, idx) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: idx === i ? 1 : 0 }}
        >
          <img
            src={s.src}
            alt={s.alt}
            className="w-full h-full object-cover animate-ken-burns"
            style={{
              // langzame zoom-in per slide
              animation: idx === i ? 'ken-burns 8s ease-out both' : undefined,
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-canal-900/70 via-canal-900/50 to-canal-900/80" />
      <style>{`
        @keyframes ken-burns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
