'use client';

/**
 * Category management. Categories are currently derived from the products
 * collection (no separate categories collection). This view groups by
 * category and gives an at-a-glance count + inventory value per category —
 * promote to a dedicated Firestore `categories` collection if you need
 * category metadata like descriptions or icons.
 */
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { Card, CardContent } from '@/components/ui/Card';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useProducts } from '@/lib/hooks/useProducts';
import { formatCurrency } from '@/lib/utils';
import { FolderKanban } from 'lucide-react';

export default function CategoriesPage() {
  const { products, categories, loading } = useProducts();

  return (
    <div>
      <DashboardTopbar title="Categories" />
      <div className="p-6 lg:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">Category breakdown</h2>
        <p className="mt-1 text-sm text-ink-soft">Product distribution and value across your categories.</p>

        {loading ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : categories.length === 0 ? (
          <p className="mt-8 text-ink-soft">No categories yet — they'll appear here once you add products.</p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const items = products.filter((p) => p.category === category);
              const value = items.reduce((sum, p) => sum + p.price * p.stockQuantity, 0);
              return (
                <Card key={category}>
                  <CardContent className="pt-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FolderKanban size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">{category}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{items.length} products</p>
                    <p className="mt-3 font-display text-lg font-bold text-primary">{formatCurrency(value)}</p>
                    <p className="text-xs text-ink-muted">Total inventory value</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
