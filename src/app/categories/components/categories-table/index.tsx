'use client'

import { ReusableTable } from '@/components/tables'
import { Category } from '@/zod'
import { useRouter } from 'next/navigation'

interface CategoriesTableProps {
  data: Category[]
}

export function CategoriesTable({ data }: CategoriesTableProps) {
  const router = useRouter()
  return (
    <ReusableTable entity="category" data={data} onRowClick={(row) => router.push(`/categories/new?edit=${row.id}`)} />
  )
}
