import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product, ProductStatus } from './types';

/** Merge Tailwind class names safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as currency (GHS by default, matching Elikem's primary market). */
export function formatCurrency(value: number, currency: string = 'GHS') {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Format an ISO date string into a readable, locale-aware date. */
export function formatDate(iso: string) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

/** Days remaining until a given ISO date (negative if already passed). */
export function daysUntil(iso: string) {
  const target = new Date(iso).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

/** Derive a product's lifecycle status from its expiry date. Near-expiry = within 90 days. */
export function getProductStatus(product: Pick<Product, 'expiryDate'>): ProductStatus {
  const remaining = daysUntil(product.expiryDate);
  if (remaining < 0) return 'expired';
  if (remaining <= 90) return 'near-expiry';
  return 'active';
}

/** Map a product status to a Tailwind color pair for badges. */
export function statusStyles(status: ProductStatus) {
  switch (status) {
    case 'active':
      return { bg: 'bg-success/10', text: 'text-success', label: 'Active' };
    case 'near-expiry':
      return { bg: 'bg-warning/10', text: 'text-warning', label: 'Near Expiry' };
    case 'expired':
      return { bg: 'bg-danger/10', text: 'text-danger', label: 'Expired' };
  }
}

/** Map an availability status to badge styling. */
export function availabilityStyles(availability: Product['availability']) {
  switch (availability) {
    case 'in-stock':
      return { bg: 'bg-primary/10', text: 'text-primary', label: 'In Stock' };
    case 'low-stock':
      return { bg: 'bg-warning/10', text: 'text-warning', label: 'Low Stock' };
    case 'out-of-stock':
      return { bg: 'bg-danger/10', text: 'text-danger', label: 'Out of Stock' };
    case 'discontinued':
      return { bg: 'bg-ink-muted/10', text: 'text-ink-muted', label: 'Discontinued' };
  }
}

/** Generate a URL-safe slug from a product name, used for QR/barcode payloads. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** Simple debounce for search inputs. */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
