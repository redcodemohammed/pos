import { z } from 'zod'

export const CategorySchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 letters')
    .max(255, 'Name cannot container more than 255 letters')
})

export type Category = z.infer<typeof CategorySchema>
export type CategoryEntity = { id: number } & Category
