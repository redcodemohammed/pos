'use client'

import { ReusableTable } from '@/components/tables'
import { Product } from '@/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
      bulkActions={[
        {
          label: 'Delete',
          variant: 'destructive',
          action: (selectedRows) => {
            toast.loading(`Deleting ${selectedRows.length} products`, {
              description: 'This action is not implemented yet'
            })
            setTimeout(() => {
              toast.dismiss()
            }, 1500)
            setTimeout(() => {
              toast.success(`${selectedRows.length} Products deleted`, {})
            }, 2000)
          }
        }
      ]}
    />
  )
}
