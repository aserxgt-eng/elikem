'use client';

/**
 * User management. Reads the `users` collection in Firestore (populated on
 * registration — see lib/services/auth.ts). Role changes here update the
 * user's document directly; pair with Firestore security rules that only
 * allow admins to write the `role` field.
 */
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Input';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/lib/hooks/useToast';
import type { AppUser, UserRole } from '@/lib/types';

export default function UsersPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, 'users'))
      .then((snap) => setUsers(snap.docs.map((d) => d.data() as AppUser)))
      .catch(() => showToast('error', 'Could not load users.'))
      .finally(() => setLoading(false));
  }, [showToast]);

  async function changeRole(uid: string, role: UserRole) {
    try {
      await updateDoc(doc(db, 'users', uid), { role });
      setUsers((prev) => prev.map((u) => (u.uid === uid ? { ...u, role } : u)));
      showToast('success', 'Role updated.');
    } catch {
      showToast('error', 'Could not update role.');
    }
  }

  return (
    <div>
      <DashboardTopbar title="Users" />
      <div className="p-6 lg:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">Team members</h2>
        <p className="mt-1 text-sm text-ink-soft">Manage roles and access across your Elikem workspace.</p>

        {loading ? (
          <div className="mt-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <Card className="mt-6 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface-light text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.uid} className="border-b border-surface-border last:border-0">
                    <td className="px-5 py-3 font-medium text-ink">{u.displayName}</td>
                    <td className="px-5 py-3 text-ink-soft">{u.email}</td>
                    <td className="px-5 py-3">
                      <Select
                        value={u.role}
                        onChange={(e) => changeRole(u.uid, e.target.value as UserRole)}
                        className="h-9 w-40"
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="viewer">Viewer</option>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}
