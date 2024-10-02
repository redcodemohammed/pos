'use client'

import { ContentLayout } from '@/components/dashboard/content-layout'
import { Category } from '@/zod'
import { useSearchParams } from 'next/navigation'
import { NewCategoryForm } from './components/new-category-form'
import { useCategoriesStore } from '@/stores/categories'

export default function CategoriesNewPage() {
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')

  let mode = 'create' as 'create' | 'edit'
  let defaults: Category | undefined

  const data = useCategoriesStore((state) => state.categories)

  if (edit) {
    mode = 'edit'
    data.find((category) => {
      if (category.id === edit) {
        defaults = category
      }
    })
  }

  return (
    <ContentLayout title="Create Categories">
      <NewCategoryForm mode={mode} defaultData={defaults} />
    </ContentLayout>
  )
}
