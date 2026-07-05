'use client';

import { Bell, Search } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

export function DashboardTopbar({ title }: { title: string }) {
  const { user, profile } = useAuth();
  const initials = (profile?.displayName || user?.email || 'U')
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-20 items-center justify-between border-b border-surface-border bg-white px-6 lg:px-8">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-xl border border-surface-border bg-surface-light px-3 py-2 sm:flex">
          <Search size={16} className="text-ink-muted" />
          <input
            placeholder="Quick search..."
            className="w-40 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
          />
        </div>
        <button className="relative rounded-xl p-2 text-ink-soft hover:bg-surface-light" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {initials}
        </div>
      </div>
    </div>
  );
}
