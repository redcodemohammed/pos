'use client'

import { ContentLayout } from '@/components/dashboard/content-layout'
import { Card, CardHeader } from '@/components/ui/card'
import { ProductsTable } from './components/products-table'
import { useProductsQuery } from '@/api/queries'
import QueryStateDisplay from '@/components/query-state-display'

export default function ProductsPage() {
  const { isSuccess, data, isPending, isError, error, refetch } = useProductsQuery()

  return (
    <ContentLayout title="All Products">
      <Card className="w-full">
        <CardHeader>All products</CardHeader>

        <QueryStateDisplay
          error={error}
          isError={isError}
          isLoading={isPending}
          isSuccess={isSuccess}
          refresh={refetch}
          fallback={<ProductsTable data={data} loading={isPending} />}
        />
      </Card>
    </ContentLayout>
  )
}
