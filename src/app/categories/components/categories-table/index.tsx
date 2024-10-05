'use client'

import { ReusableTable } from '@/components/tables'
import { CategoryEntity } from '@/zod'
import { useRouter } from 'next/navigation'

interface CategoriesTableProps {
  data?: CategoryEntity[]
  loading?: boolean
}

export function CategoriesTable({ data, loading }: CategoriesTableProps) {
  const router = useRouter()
  return (
    <ReusableTable
      loading={loading}
      entity="category"
      data={data}
      onRowClick={(row) => router.push(`/categories/new?edit=${row.id}`)}
    />
  )
}
