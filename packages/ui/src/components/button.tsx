import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canal-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-canal text-white hover:bg-canal-700',
        accent: 'bg-terracotta text-white hover:bg-terracotta-600',
        outline: 'border border-canal text-canal hover:bg-canal/5',
        ghost: 'text-canal hover:bg-canal/5',
        incoming: 'bg-incoming-orange text-white hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-14 px-7 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = 'Button';
