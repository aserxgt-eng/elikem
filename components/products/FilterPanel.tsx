'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Select } from '@/components/ui/Input';
import type { ProductFilters } from '@/lib/types';

interface FilterPanelProps {
  filters: ProductFilters;
  categories: string[];
  onChange: (updates: Partial<ProductFilters>) => void;
}

export function FilterPanel({ filters, categories, onChange }: FilterPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-surface-border bg-white p-3">
      <span className="flex items-center gap-1.5 pl-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        <SlidersHorizontal size={14} /> Filters
      </span>

      <Select
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value, page: 1 })}
        className="h-9 w-auto min-w-[140px]"
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>

      <Select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value as ProductFilters['status'], page: 1 })}
        className="h-9 w-auto min-w-[140px]"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="near-expiry">Near Expiry</option>
        <option value="expired">Expired</option>
      </Select>

      <Select
        value={filters.availability}
        onChange={(e) => onChange({ availability: e.target.value as ProductFilters['availability'], page: 1 })}
        className="h-9 w-auto min-w-[140px]"
      >
        <option value="all">All stock levels</option>
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
        <option value="discontinued">Discontinued</option>
      </Select>

      <Select
        value={`${filters.sortBy}:${filters.sortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split(':') as [ProductFilters['sortBy'], ProductFilters['sortOrder']];
          onChange({ sortBy, sortOrder });
        }}
        className="h-9 w-auto min-w-[160px]"
      >
        <option value="createdAt:desc">Newest first</option>
        <option value="name:asc">Name A–Z</option>
        <option value="price:asc">Price: Low to High</option>
        <option value="price:desc">Price: High to Low</option>
        <option value="expiryDate:asc">Expiry: Soonest</option>
        <option value="stockQuantity:asc">Stock: Low to High</option>
      </Select>
    </div>
  );
}
