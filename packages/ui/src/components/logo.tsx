/**
 * Logo's voor de 4 domeinen. Subtiel: klein Domtoren-icoon + wordmark.
 */
import { cn } from '../lib/cn';

function DomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 36" className={className} aria-hidden="true">
      <g fill="currentColor">
        {/* Spits */}
        <polygon points="12,2 9,11 15,11" />
        <circle cx="12" cy="2" r="0.8" />
        {/* Bovenring */}
        <rect x="8.5" y="11" width="7" height="1.5" />
        {/* Open kroon (pilaartjes) */}
        <rect x="9" y="12.5" width="1.2" height="5" />
        <rect x="11.4" y="12.5" width="1.2" height="5" />
        <rect x="13.8" y="12.5" width="1.2" height="5" />
        {/* Onderring */}
        <rect x="8.5" y="17.5" width="7" height="1.5" />
        {/* Toren-romp */}
        <rect x="8" y="19" width="8" height="12" />
        {/* Voet */}
        <rect x="6.5" y="31" width="11" height="3" />
      </g>
    </svg>
  );
}

export function UtrechtNowLogo({
  className,
  iconClassName,
  textClassName,
}: { className?: string; iconClassName?: string; textClassName?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <DomIcon className={cn('h-7 w-auto text-terracotta', iconClassName)} />
      <span className={cn('font-serif text-2xl text-canal-900 leading-none', textClassName)}>
        Utrecht <span className="text-terracotta">Now</span>
      </span>
    </span>
  );
}

export function DagjeUtrechtLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <DomIcon className="h-6 w-auto text-terracotta" />
      <span className="font-serif text-xl text-canal-900 leading-none">
        Dagje <span className="text-terracotta">Utrecht</span>
      </span>
    </span>
  );
}

export function NachtjeUtrechtLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <DomIcon className="h-6 w-auto text-terracotta" />
      <span className="font-serif text-xl text-canal-900 leading-none">
        Nachtje <span className="text-terracotta">Utrecht</span>
      </span>
    </span>
  );
}

export function UtrechtIncomingLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <DomIcon className="h-6 w-auto text-incoming-orange" />
      <span className="font-serif text-xl text-white leading-none">
        Utrecht <span className="text-incoming-orange">Incoming</span>
      </span>
    </span>
  );
}

export { DomIcon };
