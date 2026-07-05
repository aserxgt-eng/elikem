'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutGrid, List, PlusCircle, Download } from 'lucide-react';
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductTable } from '@/components/products/ProductTable';
import { SearchBar } from '@/components/products/SearchBar';
import { FilterPanel } from '@/components/products/FilterPanel';
import { Pagination } from '@/components/products/Pagination';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useProducts } from '@/lib/hooks/useProducts';
import { deleteProduct } from '@/lib/services/products';
import { useToast } from '@/lib/hooks/useToast';
import { exportProductsToExcel, exportProductsToPdf } from '@/lib/exports';
import type { Product } from '@/lib/types';

export default function ProductsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { paginated, filtered, totalPages, categories, filters, setFilters, loading, refresh } = useProducts();
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(toDelete.id);
      showToast('success', `${toDelete.name} was deleted.`);
      setToDelete(null);
      refresh();
    } catch {
      showToast('error', 'Could not delete this product. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <DashboardTopbar title="Products" />

      <div className="p-6 lg:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Product catalog</h2>
            <p className="mt-1 text-sm text-ink-soft">{filtered.length} products found</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportProductsToExcel(filtered)}>
              <Download size={16} /> Excel
            </Button>
            <Button variant="outline" onClick={() => exportProductsToPdf(filtered)}>
              <Download size={16} /> PDF
            </Button>
            <Link href="/dashboard/products/new">
              <Button><PlusCircle size={16} /> Add product</Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar onSearch={(term) => setFilters((f) => ({ ...f, search: term, page: 1 }))} />
          <div className="flex overflow-hidden rounded-xl border border-surface-border">
            <button
              onClick={() => setView('grid')}
              className={`flex h-12 w-12 items-center justify-center ${view === 'grid' ? 'bg-primary text-white' : 'text-ink-soft'}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setView('table')}
              className={`flex h-12 w-12 items-center justify-center ${view === 'table' ? 'bg-primary text-white' : 'text-ink-soft'}`}
              aria-label="Table view"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <FilterPanel filters={filters} categories={categories} onChange={(updates) => setFilters((f) => ({ ...f, ...updates }))} />
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-surface-border bg-white p-16 text-center">
              <p className="font-display text-lg font-bold text-ink">No products match your filters</p>
              <p className="mt-1 text-sm text-ink-soft">Try adjusting your search or filters, or add a new product.</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={(p) => router.push(`/dashboard/products/${p.id}/edit`)}
                  onDelete={(p) => setToDelete(p)}
                />
              ))}
            </div>
          ) : (
            <ProductTable
              products={paginated}
              onEdit={(p) => router.push(`/dashboard/products/${p.id}/edit`)}
              onDelete={(p) => setToDelete(p)}
            />
          )}
        </div>

        <div className="mt-8">
          <Pagination page={filters.page} totalPages={totalPages} onChange={(page) => setFilters((f) => ({ ...f, page }))} />
        </div>
      </div>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete product">
        <p className="text-sm text-ink-soft">
          Are you sure you want to delete <span className="font-semibold text-ink">{toDelete?.name}</span>? This
          action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setToDelete(null)}>Cancel</Button>
          <Button variant="danger" loading={deleting} onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
