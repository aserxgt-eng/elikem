'use client';

import Link from 'next/link';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate, getProductStatus, statusStyles } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

/** Dense tabular view of products — used in admin/report contexts alongside the card grid. */
export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-surface-border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-light text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <th className="px-5 py-3">Product</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Stock</th>
            <th className="px-5 py-3">Expiry</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const status = getProductStatus(product);
            const style = statusStyles(status);
            return (
              <tr key={product.id} className="border-b border-surface-border last:border-0 hover:bg-surface-light/60">
                <td className="px-5 py-3 font-medium text-ink">{product.name}</td>
                <td className="px-5 py-3">
                  <Badge>{product.category}</Badge>
                </td>
                <td className="px-5 py-3 text-ink-soft">{formatCurrency(product.price)}</td>
                <td className="px-5 py-3 text-ink-soft">{product.stockQuantity}</td>
                <td className="px-5 py-3 text-ink-soft">{formatDate(product.expiryDate)}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1.5">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-white hover:text-primary"
                      aria-label="View product"
                    >
                      <Eye size={15} />
                    </Link>
                    <button
                      onClick={() => onEdit(product)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-white hover:text-primary"
                      aria-label="Edit product"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-white hover:text-danger"
                      aria-label="Delete product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
