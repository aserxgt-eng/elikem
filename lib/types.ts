/**
 * Shared TypeScript types for the Elikem product management domain.
 */

export type AvailabilityStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';

export type ProductStatus = 'active' | 'expired' | 'near-expiry';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  manufacturingDate: string; // ISO date string
  expiryDate: string; // ISO date string
  placeOfOrigin: string;
  batchNumber: string;
  stockQuantity: number;
  availability: AvailabilityStatus;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export type NewProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export interface Category {
  id: string;
  name: string;
  description?: string;
  productCount?: number;
}

export type UserRole = 'admin' | 'manager' | 'viewer';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  expiredProducts: number;
  nearExpiryProducts: number;
  inventoryValue: number;
  lowStockProducts: number;
}

export interface ProductFilters {
  search: string;
  category: string | 'all';
  availability: AvailabilityStatus | 'all';
  status: ProductStatus | 'all';
  sortBy: 'name' | 'price' | 'expiryDate' | 'stockQuantity' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
