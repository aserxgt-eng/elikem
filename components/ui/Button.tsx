'use client';

/**
 * Primary button component with a built-in "ripple" click animation
 * and four semantic variants used consistently across the app.
 */
import { forwardRef, useState, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const VARIANTS: Record<string, string> = {
  primary: 'bg-primary text-white hover:bg-primary-600 shadow-soft',
  secondary: 'bg-secondary text-white hover:bg-secondary-600 shadow-soft',
  outline: 'border border-surface-border text-ink bg-white hover:border-primary hover:text-primary',
  ghost: 'text-ink-soft hover:bg-surface-light',
  danger: 'bg-danger text-white hover:bg-red-700 shadow-soft',
};

const SIZES: Record<string, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
      ]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
      onClick?.(e);
    }

    return (
      <button
        ref={ref}
        className={cn(
          'relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ping-once"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
