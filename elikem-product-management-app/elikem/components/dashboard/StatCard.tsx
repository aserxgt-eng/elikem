'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  accent?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  delay?: number;
}

const ACCENTS: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

export function StatCard({ icon: Icon, label, value, trend, trendUp, accent = 'primary', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-surface-border bg-white p-6 shadow-soft"
    >
      <div className="flex items-start justify-between">
        <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', ACCENTS[accent])}>
          <Icon size={20} />
        </span>
        {trend && (
          <span
            className={cn(
              'text-xs font-semibold',
              trendUp ? 'text-success' : 'text-danger'
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </motion.div>
  );
}
