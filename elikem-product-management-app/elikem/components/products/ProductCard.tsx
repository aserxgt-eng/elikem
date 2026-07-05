'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Eye, MapPin, CalendarClock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate, getProductStatus, statusStyles, availabilityStyles } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const status = getProductStatus(product);
  const statusStyle = statusStyles(status);
  const availabilityStyle = availabilityStyles(product.availability);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-2xl border border-surface-border bg-white shadow-soft transition-shadow hover:shadow-elevated"
    >
      <div className="relative h-44 w-full overflow-hidden bg-surface-light">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">No image</div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="primary">{product.category}</Badge>
        </div>
        <div className="absolute right-3 top-3">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
            {statusStyle.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold text-ink line-clamp-1">{product.name}</h3>
          <span className="shrink-0 font-display text-base font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
        </div>

        <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
          <MapPin size={12} /> {product.placeOfOrigin}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
          <span className="flex items-center gap-1">
            <CalendarClock size={12} /> Exp {formatDate(product.expiryDate)}
          </span>
          <span className={`rounded-full px-2 py-0.5 font-semibold ${availabilityStyle.bg} ${availabilityStyle.text}`}>
            {availabilityStyle.label}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-surface-border pt-4">
          <Link
            href={`/products/${product.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-surface-border py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-primary hover:text-primary"
          >
            <Eye size={14} /> View
          </Link>
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-ink-soft transition-colors hover:border-primary hover:text-primary"
              aria-label="Edit product"
            >
              <Pencil size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-ink-soft transition-colors hover:border-danger hover:text-danger"
              aria-label="Delete product"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
