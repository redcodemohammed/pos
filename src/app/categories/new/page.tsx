'use client'

import { ContentLayout } from '@/components/dashboard/content-layout'
import { Category } from '@/zod'
import { useSearchParams } from 'next/navigation'
import { NewCategoryForm } from './components/new-category-form'

export default function CategoriesNewPage() {
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')

  let mode = 'create' as 'create' | 'edit'
  let defaults: Category | undefined
  if (edit) {
    mode = 'edit'

    defaults = {
      id: '82fd4b7a',
      name: 'Clothing'
    }
  }

  return (
    <ContentLayout title="Create Categories">
      <NewCategoryForm mode={mode} defaultData={defaults} />
    </ContentLayout>
  )
}
