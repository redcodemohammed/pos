import { CategoryEntity, ProductEntity } from '@/zod'
import { ColumnDef } from '@tanstack/react-table'

// Reusing your column definitions
export const product: ColumnDef<ProductEntity>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'cost_price', header: 'Cost Price' },
  { accessorKey: 'sale_price', header: 'Sale Price' }
]

export const category: ColumnDef<CategoryEntity>[] = [{ accessorKey: 'name', header: 'Name' }]

const columns = {
  product,
  category
}

export type EntityMap = {
  product: ProductEntity[]
  category: CategoryEntity[]
}

export default columns
