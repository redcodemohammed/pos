import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, 'Name must contain at least 3 letters')
    .max(255, 'Name cannot container more than 255 letters'),
  price: z.coerce
    .number({ invalid_type_error: 'Price is required' })
    .min(1, 'Price cannot be less than 1 IQD')
    .max(1000000, 'Price cannot be more than 1000000 IQD'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity is required' })
    .min(1, 'Quantity cannot be less than 1')
    .max(1000, 'Quantity cannot be more than 1000'),
  category: z.string().optional()
})

export type Product = z.infer<typeof ProductSchema>
