'use client'

import { type Product } from '@/zod'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  }
]
