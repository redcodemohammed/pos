'use client'

import { ReusableTable } from '@/components/tables'
import { Product } from '@/zod'
import { useRouter } from 'next/navigation'

interface ProductsTableProps {
  data: Product[]
}

export function ProductsTable({ data }: ProductsTableProps) {
  const router = useRouter()
  return (
    <ReusableTable<Product>
      entity="product"
      data={data}
      onRowClick={(row) => router.push(`/products/new?edit=${row.id}`)}
    />
  )
}
