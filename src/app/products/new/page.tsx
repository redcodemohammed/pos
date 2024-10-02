'use client'

import { ContentLayout } from '@/components/dashboard/content-layout'
import { NewProductForm } from './components/new-product-form'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/zod'
import { useProductsStore } from '@/stores/products'

export default function ProductsNewPage() {
  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')

  let mode = 'create' as 'create' | 'edit'
  let defaults: Product | undefined

  const data = useProductsStore((state) => state.products)
  if (edit) {
    mode = 'edit'

    data.find((product) => {
      if (product.id === edit) {
        defaults = product
      }
    })
  }

  return (
    <ContentLayout title={mode === 'create' ? 'New Product' : 'Edit Product'}>
      <NewProductForm mode={mode} defaultData={defaults} />
    </ContentLayout>
  )
}
