import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0';
    
    const variants = {
      default: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground',
      destructive: 'border-transparent bg-destructive text-white',
      outline: 'text-foreground border-border',
    };

    return (
      <div
        className={cn(
          baseClasses,
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
