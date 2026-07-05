'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { ProductForm } from '@/components/products/ProductForm';
import { Card, CardContent } from '@/components/ui/Card';
import { getProduct, updateProduct } from '@/lib/services/products';
import { useToast } from '@/lib/hooks/useToast';
import type { Product } from '@/lib/types';
import type { ProductFormValues } from '@/lib/validations/product';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { showToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values: ProductFormValues) {
    setSubmitting(true);
    try {
      await updateProduct(id, values);
      showToast('success', 'Product updated successfully.');
      router.push('/dashboard/products');
    } catch {
      showToast('error', 'Could not update this product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <DashboardTopbar title="Edit product" />
      <div className="p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={28} />
          </div>
        ) : !product ? (
          <p className="text-center text-ink-soft">Product not found.</p>
        ) : (
          <Card className="mx-auto max-w-3xl">
            <CardContent className="pt-6">
              <ProductForm defaultValues={product} onSubmit={handleSubmit} submitting={submitting} submitLabel="Save changes" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
