'use client'

import { ContentLayout } from '@/components/dashboard/content-layout'
import { NewProductForm } from './components/new-product-form'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/zod'

export default function ProductNewPage() {
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')

  let mode = 'create' as 'create' | 'edit'
  let defaults: Product | undefined
  if (edit) {
    mode = 'edit'

    defaults = {
      id: '82fd4b7a',
      name: 'Jeans',
      price: 2000,
      quantity: 5,
      category: 'Clothing'
    }
  }

  return (
    <ContentLayout title={mode === 'create' ? 'New Product' : 'Edit Product'}>
      <NewProductForm mode={mode} defaultData={defaults} />
    </ContentLayout>
  )
}
