import * as React from 'react';
import { cn } from '../lib/cn';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-md border border-canal-200 bg-white px-3 text-base text-canal-900 placeholder:text-canal-400 focus:outline-none focus:ring-2 focus:ring-canal-500',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
