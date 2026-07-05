'use client';

/**
 * Client-side hook that loads all products once and exposes derived,
 * filtered/sorted/paginated views plus dashboard statistics.
 * For very large catalogs, swap the initial fetch for a paginated
 * Firestore query — the filtering shape here stays the same.
 */
import { useEffect, useMemo, useState, useCallback } from 'react';
import { getAllProducts } from '@/lib/services/products';
import { getProductStatus } from '@/lib/utils';
import type { DashboardStats, Product, ProductFilters } from '@/lib/types';

const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  category: 'all',
  availability: 'all',
  status: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  pageSize: 9,
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Could not load products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search.trim()) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.batchNumber.toLowerCase().includes(term)
      );
    }
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.availability !== 'all') {
      result = result.filter((p) => p.availability === filters.availability);
    }
    if (filters.status !== 'all') {
      result = result.filter((p) => getProductStatus(p) === filters.status);
    }

    result.sort((a, b) => {
      const dir = filters.sortOrder === 'asc' ? 1 : -1;
      const field = filters.sortBy;
      if (field === 'name') return a.name.localeCompare(b.name) * dir;
      if (field === 'price') return (a.price - b.price) * dir;
      if (field === 'stockQuantity') return (a.stockQuantity - b.stockQuantity) * dir;
      if (field === 'expiryDate')
        return (new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()) * dir;
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
    });

    return result;
  }, [products, filters]);

  const paginated = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize;
    return filtered.slice(start, start + filters.pageSize);
  }, [filtered, filters.page, filters.pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize));

  const stats: DashboardStats = useMemo(() => {
    const now = products.reduce(
      (acc, p) => {
        const status = getProductStatus(p);
        acc.totalProducts += 1;
        acc.inventoryValue += p.price * p.stockQuantity;
        if (status === 'active') acc.activeProducts += 1;
        if (status === 'expired') acc.expiredProducts += 1;
        if (status === 'near-expiry') acc.nearExpiryProducts += 1;
        if (p.availability === 'low-stock') acc.lowStockProducts += 1;
        return acc;
      },
      {
        totalProducts: 0,
        activeProducts: 0,
        expiredProducts: 0,
        nearExpiryProducts: 0,
        inventoryValue: 0,
        lowStockProducts: 0,
      }
    );
    return now;
  }, [products]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  );

  return {
    products,
    filtered,
    paginated,
    totalPages,
    stats,
    categories,
    loading,
    error,
    filters,
    setFilters,
    refresh,
  };
}
