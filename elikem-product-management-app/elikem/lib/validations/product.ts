import { z } from 'zod';

/**
 * Zod schema for creating/editing a product.
 * Mirrors the Product type in lib/types.ts and drives React Hook Form validation.
 */
export const productSchema = z
  .object({
    name: z.string().min(2, 'Product name must be at least 2 characters').max(120),
    category: z.string().min(1, 'Select a category'),
    price: z.coerce.number().positive('Price must be greater than 0'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
    imageUrl: z.string().url('Provide a valid image URL').or(z.literal('')),
    manufacturingDate: z.string().min(1, 'Manufacturing date is required'),
    expiryDate: z.string().min(1, 'Expiry date is required'),
    placeOfOrigin: z.string().min(2, 'Place of origin is required'),
    batchNumber: z
      .string()
      .min(3, 'Batch number must be at least 3 characters')
      .max(40),
    stockQuantity: z.coerce.number().int().min(0, 'Stock cannot be negative'),
    availability: z.enum(['in-stock', 'low-stock', 'out-of-stock', 'discontinued']),
  })
  .refine((data) => new Date(data.expiryDate) > new Date(data.manufacturingDate), {
    message: 'Expiry date must be after manufacturing date',
    path: ['expiryDate'],
  });

export type ProductFormValues = z.infer<typeof productSchema>;
