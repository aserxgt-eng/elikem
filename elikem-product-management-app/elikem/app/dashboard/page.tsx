'use client';

import Link from 'next/link';
import { Package, CheckCircle2, AlertTriangle, Clock, Wallet, PlusCircle } from 'lucide-react';
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { StatCard } from '@/components/dashboard/StatCard';
import { InventoryChart } from '@/components/dashboard/charts/InventoryChart';
import { CategoryChart } from '@/components/dashboard/charts/CategoryChart';
import { ExpiryChart } from '@/components/dashboard/charts/ExpiryChart';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useProducts } from '@/lib/hooks/useProducts';
import { formatCurrency, formatDate, getProductStatus, statusStyles } from '@/lib/utils';

export default function DashboardOverviewPage() {
  const { products, stats, categories, loading } = useProducts();

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const categoryData = categories.map((category) => ({
    category,
    count: products.filter((p) => p.category === category).length,
  }));

  // Placeholder trend series — replace with real historical snapshots (e.g. daily Firestore aggregates).
  const inventoryTrend = [
    { label: 'Mon', value: stats.inventoryValue * 0.82 },
    { label: 'Tue', value: stats.inventoryValue * 0.88 },
    { label: 'Wed', value: stats.inventoryValue * 0.91 },
    { label: 'Thu', value: stats.inventoryValue * 0.95 },
    { label: 'Fri', value: stats.inventoryValue * 0.97 },
    { label: 'Sat', value: stats.inventoryValue * 0.99 },
    { label: 'Sun', value: stats.inventoryValue },
  ];

  return (
    <div>
      <DashboardTopbar title="Overview" />

      <div className="p-6 lg:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Welcome back 👋</h2>
            <p className="mt-1 text-sm text-ink-soft">Here's what's happening across your catalog today.</p>
          </div>
          <Link href="/dashboard/products/new">
            <Button>
              <PlusCircle size={18} /> Add product
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard icon={Package} label="Total Products" value={String(stats.totalProducts)} accent="primary" delay={0} />
            <StatCard icon={CheckCircle2} label="Active Products" value={String(stats.activeProducts)} accent="success" delay={0.05} />
            <StatCard icon={Clock} label="Near Expiry" value={String(stats.nearExpiryProducts)} accent="warning" delay={0.1} />
            <StatCard icon={AlertTriangle} label="Expired Products" value={String(stats.expiredProducts)} accent="danger" delay={0.15} />
            <StatCard icon={Wallet} label="Inventory Value" value={formatCurrency(stats.inventoryValue)} accent="secondary" delay={0.2} />
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="font-display text-base font-bold text-ink">Inventory value trend</h3>
              <p className="text-sm text-ink-muted">Rolling 7-day snapshot</p>
            </CardHeader>
            <CardContent>
              <InventoryChart data={inventoryTrend} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-display text-base font-bold text-ink">Lifecycle breakdown</h3>
              <p className="text-sm text-ink-muted">Active vs. near-expiry vs. expired</p>
            </CardHeader>
            <CardContent>
              <ExpiryChart active={stats.activeProducts} nearExpiry={stats.nearExpiryProducts} expired={stats.expiredProducts} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="font-display text-base font-bold text-ink">Recent products</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentProducts.length === 0 && (
                <p className="text-sm text-ink-muted">No products yet — add your first one to see it here.</p>
              )}
              {recentProducts.map((product) => {
                const style = statusStyles(getProductStatus(product));
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center justify-between rounded-xl border border-surface-border p-3 transition-colors hover:bg-surface-light"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">{product.name}</p>
                      <p className="text-xs text-ink-muted">Added {formatDate(product.createdAt)}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-display text-base font-bold text-ink">Products by category</h3>
            </CardHeader>
            <CardContent>
              <CategoryChart data={categoryData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
