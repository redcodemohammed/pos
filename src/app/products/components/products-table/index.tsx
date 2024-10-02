'use client'

import { ReusableTable } from '@/components/tables'
import { Product } from '@/zod'
import { useRouter } from 'next/navigation'

interface ProductsTableProps {
  data?: Product[]
  loading?: boolean
}

export function ProductsTable({ data, loading }: ProductsTableProps) {
  const router = useRouter()
  return (
    <ReusableTable
      loading={loading}
      entity="product"
      data={data}
      onRowClick={(row) => router.push(`/products/new?edit=${row.id}`)}
    />
  )
}
