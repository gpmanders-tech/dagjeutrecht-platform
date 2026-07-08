import * as React from 'react';
import { cn } from '../lib/cn';
import { providerImageUrl } from '../lib/format';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl bg-white border border-canal-100 shadow-soft overflow-hidden',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export const CardBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('font-serif text-xl text-canal-900 mb-1', className)} {...props} />
);

export const CardMeta = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-canal-600', className)} {...props} />
);

/** Foto-bovenkant voor kaartjes met een leverancier/product.
 *  Toont `heroImage` als gezet (gescraped of admin-upload), anders picsum-fallback. */
export function CardImage({
  slug,
  heroImage,
  alt,
  ratio = 'aspect-[5/3]',
  className,
}: {
  slug: string;
  heroImage?: string | null;
  alt: string;
  ratio?: string;
  className?: string;
}) {
  const src = heroImage || providerImageUrl(slug, 480, 288);
  return (
    <div className={cn('relative overflow-hidden bg-canal-100', ratio, className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
