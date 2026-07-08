/**
 * Utrecht skyline silhouet — Domtoren + Singel + grachtenhuizen.
 * Gebruikt achter dark hero secties. Vul `className` voor positie/opacity.
 */
export function UtrechtSkyline({
  className = '',
  color = 'currentColor',
}: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYEnd slice"
      aria-hidden="true"
    >
      <g fill={color}>
        {/* Grachtenhuizen links (stepped gables) */}
        <path d="M 0 280 L 0 200 L 30 200 L 30 180 L 50 180 L 50 195 L 70 195 L 70 175 L 85 175 L 85 195 L 105 195 L 105 210 L 130 210 L 130 190 L 155 190 L 155 215 L 180 215 L 180 200 L 200 200 L 200 280 Z" />

        {/* Trapgevel-rij 1 */}
        <path d="M 200 280 L 200 215 L 215 215 L 215 205 L 230 205 L 230 195 L 250 195 L 250 205 L 265 205 L 265 215 L 280 215 L 280 280 Z" />

        {/* Pieksgevel huis */}
        <path d="M 280 280 L 280 210 L 295 210 L 310 185 L 325 210 L 340 210 L 340 280 Z" />

        {/* Brede huizen */}
        <path d="M 340 280 L 340 220 L 365 220 L 365 200 L 395 200 L 395 220 L 420 220 L 420 280 Z" />

        {/* Klein torentje (St. Willibrordkerk) */}
        <path d="M 420 280 L 420 195 L 432 195 L 432 175 L 440 165 L 448 175 L 448 195 L 460 195 L 460 280 Z" />
        <circle cx="440" cy="160" r="4" />

        {/* Grachtenpand-rij voor Dom */}
        <path d="M 460 280 L 460 220 L 480 220 L 480 200 L 495 200 L 495 215 L 510 215 L 510 200 L 525 200 L 525 220 L 545 220 L 545 280 Z" />

        {/* ===== DOMTOREN ===== (centrum, x≈600, hoog ~250px) */}
        {/* Basis (4-kantige toren) */}
        <rect x="572" y="180" width="56" height="100" />
        {/* Eerste geleding versmalt */}
        <rect x="582" y="140" width="36" height="40" />
        {/* Tweede geleding (achtkant onderbouw) */}
        <rect x="586" y="100" width="28" height="40" />
        {/* Open kroon (galerij) — 4 pilaartjes met openingen */}
        <rect x="586" y="68" width="4" height="32" />
        <rect x="594" y="68" width="4" height="32" />
        <rect x="602" y="68" width="4" height="32" />
        <rect x="610" y="68" width="4" height="32" />
        {/* Bovenste ring */}
        <rect x="586" y="62" width="28" height="6" />
        {/* Spits */}
        <polygon points="600,20 588,62 612,62" />
        <circle cx="600" cy="18" r="2" />

        {/* Domplein-aanduiding: lage muur naast toren */}
        <rect x="540" y="240" width="32" height="40" />
        <rect x="628" y="240" width="32" height="40" />

        {/* Grachtenhuizen rechts van Dom */}
        <path d="M 660 280 L 660 220 L 680 220 L 680 200 L 700 200 L 700 215 L 720 215 L 720 195 L 740 195 L 740 215 L 760 215 L 760 220 L 780 220 L 780 280 Z" />

        {/* Trapgevel rechts */}
        <path d="M 780 280 L 780 215 L 795 215 L 795 200 L 810 200 L 810 185 L 825 185 L 825 200 L 840 200 L 840 215 L 855 215 L 855 280 Z" />

        {/* Klein tweede torentje (Buurkerk) */}
        <path d="M 855 280 L 855 200 L 868 200 L 868 175 L 880 165 L 892 175 L 892 200 L 905 200 L 905 280 Z" />

        {/* Brede pakhuizen */}
        <path d="M 905 280 L 905 225 L 940 225 L 940 210 L 980 210 L 980 225 L 1015 225 L 1015 280 Z" />

        {/* Laatste gevels rechts */}
        <path d="M 1015 280 L 1015 210 L 1035 210 L 1035 195 L 1055 195 L 1055 215 L 1075 215 L 1075 205 L 1100 205 L 1100 220 L 1130 220 L 1130 200 L 1160 200 L 1160 215 L 1185 215 L 1185 200 L 1200 200 L 1200 280 Z" />

        {/* ==== SINGEL (water) ==== */}
        {/* Reflectie-lijn */}
        <rect x="0" y="282" width="1200" height="2" opacity="0.5" />
        {/* Golfjes */}
        <path d="M 0 292 Q 30 288, 60 292 T 120 292 T 180 292 T 240 292 T 300 292 T 360 292 T 420 292 T 480 292 T 540 292 T 600 292 T 660 292 T 720 292 T 780 292 T 840 292 T 900 292 T 960 292 T 1020 292 T 1080 292 T 1140 292 T 1200 292 L 1200 320 L 0 320 Z" opacity="0.6" />
        {/* Bootje 1 */}
        <path d="M 240 288 L 270 288 L 265 296 L 245 296 Z" />
        <rect x="252" y="282" width="2" height="6" />
        {/* Bootje 2 */}
        <path d="M 830 286 L 870 286 L 864 296 L 836 296 Z" />
        <rect x="847" y="278" width="2" height="8" />
      </g>
    </svg>
  );
}
