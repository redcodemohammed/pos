'use client'

import { ContentLayout } from '@/components/dashboard/content-layout'
import { useSearchParams } from 'next/navigation'
import { NewProductForm } from './components/new-product-form'
import { useProductQuery } from '@/api/queries'
import QueryStateDisplay from '@/components/query-state-display'

export default function ProductsNewPage() {
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')

  let mode = 'create' as 'create' | 'edit'

  if (edit) {
    mode = 'edit'
  }

  const { error, isError, isPending, isSuccess, data } = useProductQuery(parseInt(edit!))

  return (
    <ContentLayout title={mode === 'create' ? 'New Product' : 'Edit Product'}>
      <QueryStateDisplay
        error={error}
        isError={isError}
        isLoading={isPending}
        isSuccess={isSuccess}
        fallback={<NewProductForm mode={mode} defaultData={data} />}
      />
    </ContentLayout>
  )
}
