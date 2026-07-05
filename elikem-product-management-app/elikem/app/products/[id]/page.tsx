'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, MapPin, CalendarClock, Layers, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductQRCode } from '@/components/products/ProductQRCode';
import { getProduct, getAllProducts } from '@/lib/services/products';
import { formatCurrency, formatDate, getProductStatus, statusStyles, availabilityStyles } from '@/lib/utils';
import type { Product } from '@/lib/types';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await getProduct(id);
      setProduct(p);
      if (p) {
        const all = await getAllProducts();
        setRelated(all.filter((item) => item.category === p.category && item.id !== p.id).slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="font-display text-xl font-bold text-ink">Product not found</p>
        <Link href="/" className="text-primary hover:underline">Back to home</Link>
      </div>
    );
  }

  const status = getProductStatus(product);
  const statusStyle = statusStyles(status);
  const availabilityStyle = availabilityStyles(product.availability);

  return (
    <main>
      <Navbar />
      <div className="container-app pb-24 pt-32">
        <Link href="/dashboard/products" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-primary">
          <ArrowLeft size={16} /> Back to products
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="relative h-96 overflow-hidden rounded-3xl bg-surface-light">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-ink-muted">No image available</div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{product.category}</Badge>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                {statusStyle.label}
              </span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${availabilityStyle.bg} ${availabilityStyle.text}`}>
                {availabilityStyle.label}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">{product.name}</h1>
            <p className="mt-2 font-display text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>

            <p className="mt-5 leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <InfoRow icon={MapPin} label="Origin" value={product.placeOfOrigin} />
              <InfoRow icon={Layers} label="Batch Number" value={product.batchNumber} mono />
              <InfoRow icon={CalendarClock} label="Manufactured" value={formatDate(product.manufacturingDate)} />
              <InfoRow icon={CalendarClock} label="Expires" value={formatDate(product.expiryDate)} />
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-surface-border p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">In stock</p>
                <p className="font-display text-xl font-bold text-ink">{product.stockQuantity} units</p>
              </div>
              <ProductQRCode productId={product.id} batchNumber={product.batchNumber} size={96} />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-xl font-bold text-ink">Related products</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

function InfoRow({ icon: Icon, label, value, mono }: { icon: any; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-xs text-ink-muted">{label}</p>
        <p className={`text-sm font-semibold text-ink ${mono ? 'font-mono' : ''}`}>{value}</p>
      </div>
    </div>
  );
}
