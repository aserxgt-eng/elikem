'use client';

/**
 * Create/edit form for a Product. Shared by the "new product" and "edit product"
 * dashboard routes — pass `defaultValues` and `onSubmit` to reuse for both.
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { productSchema, type ProductFormValues } from '@/lib/validations/product';

const CATEGORIES = ['Pharmaceuticals', 'Wellness', 'Diagnostics', 'Medical Devices', 'Personal Care', 'Other'];

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
  submitLabel?: string;
  submitting?: boolean;
}

export function ProductForm({ defaultValues, onSubmit, submitLabel = 'Save product', submitting }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      availability: 'in-stock',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Product name" placeholder="Amoxicillin 500mg" error={errors.name?.message} {...register('name')} />
        <Select label="Category" error={errors.category?.message} {...register('category')}>
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Price"
          type="number"
          step="0.01"
          placeholder="0.00"
          error={errors.price?.message}
          {...register('price')}
        />
        <Input
          label="Stock quantity"
          type="number"
          placeholder="0"
          error={errors.stockQuantity?.message}
          {...register('stockQuantity')}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="Describe the product, its use case, and any relevant details..."
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        label="Image URL"
        placeholder="https://..."
        hint="Paste a hosted image URL (Firebase Storage, CDN, etc.)"
        error={errors.imageUrl?.message}
        {...register('imageUrl')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Manufacturing date"
          type="date"
          error={errors.manufacturingDate?.message}
          {...register('manufacturingDate')}
        />
        <Input
          label="Expiry date"
          type="date"
          error={errors.expiryDate?.message}
          {...register('expiryDate')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Place of origin"
          placeholder="Accra, Ghana"
          error={errors.placeOfOrigin?.message}
          {...register('placeOfOrigin')}
        />
        <Input
          label="Batch number"
          placeholder="EL-2026-0417"
          error={errors.batchNumber?.message}
          {...register('batchNumber')}
        />
      </div>

      <Select label="Availability status" error={errors.availability?.message} {...register('availability')}>
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
        <option value="discontinued">Discontinued</option>
      </Select>

      <Button type="submit" size="lg" className="w-full sm:w-auto" loading={submitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
