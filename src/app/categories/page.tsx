'use client'

import { useCategoriesQuery } from '@/api/queries'
import { ContentLayout } from '@/components/dashboard/content-layout'
import { Card, CardHeader } from '@/components/ui/card'
import { CategoriesTable } from './components/categories-table'

export default function CategoriesPage() {
  const { data, isPending, isError, error } = useCategoriesQuery()

  return (
    <ContentLayout title="All Categories">
      <Card className="w-full">
        <CardHeader></CardHeader>
        {isError ? JSON.stringify(error) : <CategoriesTable data={data} loading={isPending} />}
      </Card>
    </ContentLayout>
  )
}
