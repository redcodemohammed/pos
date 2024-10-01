import { type Product } from '@/zod'
import { type Category } from '@/zod'
import { ColumnDef } from '@tanstack/react-table'

// Reusing your column definitions
export const product: ColumnDef<Product>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'category', header: 'Category' }
]

export const category: ColumnDef<Category>[] = [{ accessorKey: 'name', header: 'Name' }]

const columns = {
  product,
  category
}

export type EntityMap = {
  product: Product[]
  category: Category[]
}

export default columns
