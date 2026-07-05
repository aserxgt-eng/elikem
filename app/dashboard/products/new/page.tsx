'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardTopbar } from '@/components/layout/DashboardTopbar';
import { ProductForm } from '@/components/products/ProductForm';
import { Card, CardContent } from '@/components/ui/Card';
import { createProduct } from '@/lib/services/products';
import { useToast } from '@/lib/hooks/useToast';
import type { ProductFormValues } from '@/lib/validations/product';

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(values: ProductFormValues) {
    setSubmitting(true);
    try {
      await createProduct(values);
      showToast('success', `${values.name} was added to your catalog.`);
      router.push('/dashboard/products');
    } catch {
      showToast('error', 'Could not create this product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <DashboardTopbar title="Add product" />
      <div className="p-6 lg:p-8">
        <Card className="mx-auto max-w-3xl">
          <CardContent className="pt-6">
            <ProductForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Create product" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
