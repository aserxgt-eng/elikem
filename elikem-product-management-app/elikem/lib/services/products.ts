/**
 * Firestore service for Product CRUD operations.
 * All product reads/writes should go through this module.
 */
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { NewProduct, Product } from '@/lib/types';

const PRODUCTS_COLLECTION = 'products';

export async function createProduct(data: NewProduct) {
  const ref = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<NewProduct>) {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

export async function getProduct(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
  if (!snap.exists()) return null;
  return normalizeProduct(snap.id, snap.data());
}

export async function getAllProducts(): Promise<Product[]> {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeProduct(d.id, d.data()));
}

/** Convert Firestore Timestamp fields into ISO strings for consistent client-side use. */
function normalizeProduct(id: string, data: any): Product {
  const toIso = (value: any) =>
    value?.toDate ? value.toDate().toISOString() : value ?? new Date().toISOString();

  return {
    id,
    name: data.name ?? '',
    category: data.category ?? '',
    price: data.price ?? 0,
    description: data.description ?? '',
    imageUrl: data.imageUrl ?? '',
    manufacturingDate: data.manufacturingDate ?? '',
    expiryDate: data.expiryDate ?? '',
    placeOfOrigin: data.placeOfOrigin ?? '',
    batchNumber: data.batchNumber ?? '',
    stockQuantity: data.stockQuantity ?? 0,
    availability: data.availability ?? 'in-stock',
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
    createdBy: data.createdBy,
  };
}
