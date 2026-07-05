'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderKanban,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  ActivitySquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/lib/services/auth';
import { useToast } from '@/lib/hooks/useToast';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/categories', label: 'Categories', icon: FolderKanban },
  { href: '/dashboard/reports', label: 'Reports', icon: FileBarChart },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  async function handleLogout() {
    await logout();
    showToast('success', 'Signed out successfully');
    router.push('/login');
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-surface-border bg-white lg:flex">
      <div className="flex h-20 items-center gap-2 px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
          <ActivitySquare size={20} />
        </span>
        <span className="font-display text-xl font-bold text-ink">Elikem</span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-ink-soft hover:bg-surface-light hover:text-ink'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-surface-border p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-danger/5 hover:text-danger"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
