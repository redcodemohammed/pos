import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(3, 'Name must contain at least 3 letters')
    .max(255, 'Name cannot container more than 255 letters'),
  category_id: z.coerce.number().optional().or(z.string().optional()),
  sale_price: z.coerce
    .number({ invalid_type_error: 'Sale Price is required' })
    .min(1, 'Sale Price cannot be less than 1 IQD')
    .max(1000000, 'Sale Price cannot be more than 1000000 IQD'),
  cost_price: z.coerce
    .number({ invalid_type_error: 'Cost Price is required' })
    .min(1, 'Cost Price cannot be less than 1 IQD')
    .max(1000000, 'Cost Price cannot be more than 1000000 IQD')
})

export type Product = z.infer<typeof ProductSchema>
