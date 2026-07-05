'use client';

import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

export default function SettingsPage() {
  const { user, profile } = useAuth();

  return (
    <div>
      <DashboardTopbar title="Settings" />
      <div className="p-6 lg:p-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <h2 className="font-display text-lg font-bold text-ink">Account settings</h2>
            <p className="text-sm text-ink-muted">Update your workspace profile details.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <Input label="Full name" defaultValue={profile?.displayName ?? ''} />
            <Input label="Email address" defaultValue={user?.email ?? ''} disabled />
            <Button>Save changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
