'use client'

import { useCategoryQuery } from '@/api/queries'
import { ContentLayout } from '@/components/dashboard/content-layout'
import QueryStateDisplay from '@/components/query-state-display'
import { useSearchParams } from 'next/navigation'
import { NewCategoryForm } from './components/new-category-form'

export default function CategoriesNewPage() {
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')

  let mode = 'create' as 'create' | 'edit'

  if (edit) {
    mode = 'edit'
  }
  const { error, isError, isPending, isSuccess, data } = useCategoryQuery(parseInt(edit!))

  return (
    <ContentLayout title={mode === 'create' ? 'Create Category' : 'Edit Category'}>
      <QueryStateDisplay
        error={error}
        isError={isError}
        isLoading={isPending}
        isSuccess={isSuccess}
        fallback={<NewCategoryForm mode={mode} defaultData={data} />}
      />
    </ContentLayout>
  )
}
