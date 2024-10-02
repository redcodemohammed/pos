'use client'

import { useCategoriesQuery } from '@/api/queries'
import { ContentLayout } from '@/components/dashboard/content-layout'
import { Card, CardHeader } from '@/components/ui/card'
import { CategoriesTable } from './components/categories-table'
import QueryStateDisplay from '@/components/query-state-display'

export default function CategoriesPage() {
  const { isSuccess, data, isPending, isError, error, refetch } = useCategoriesQuery()

  return (
    <ContentLayout title="All Categories">
      <Card className="w-full">
        <CardHeader></CardHeader>

        <QueryStateDisplay
          error={error}
          isError={isError}
          isLoading={isPending}
          isSuccess={isSuccess}
          refresh={refetch}
          fallback={<CategoriesTable data={data} loading={isPending} />}
        />
      </Card>
    </ContentLayout>
  )
}
