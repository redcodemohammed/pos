'use client'
import { ContentLayout } from '@/components/dashboard/content-layout'
import FilterableProductList from './components/filterable-product-list'
import { useCategoriesQuery, useProductsQuery } from '@/api/queries'
import QueryStateDisplay from '@/components/query-state-display'

export default function HomePage() {
  // fetch all products
  // const { data: products } = useProductsQuery()
  const { data: categories } = useCategoriesQuery()
  const { isSuccess, data, isPending, isError, error, refetch } = useProductsQuery()

  return (
    <ContentLayout title="Home page">
      <QueryStateDisplay
        error={error}
        isError={isError}
        isLoading={isPending}
        isSuccess={isSuccess}
        refresh={refetch}
        fallback={<FilterableProductList products={data! || []} categories={categories! || []} />}
      />
    </ContentLayout>
  )
}
