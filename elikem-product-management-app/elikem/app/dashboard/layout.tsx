'use client';

/**
 * Protected shell for all /dashboard/* routes. Redirects unauthenticated
 * visitors to /login once the auth state has resolved.
 */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-light">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-light">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
