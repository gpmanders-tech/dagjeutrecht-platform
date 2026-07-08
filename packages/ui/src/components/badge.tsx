import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    tone: {
      default: 'bg-canal-100 text-canal-800',
      accent: 'bg-terracotta-100 text-terracotta-700',
      tip: 'bg-amber-100 text-amber-800',
      success: 'bg-emerald-100 text-emerald-800',
    },
  },
  defaultVariants: { tone: 'default' },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, tone, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ tone }), className)} {...props} />
);
