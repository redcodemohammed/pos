'use client'

import { ContentLayout } from '@/components/dashboard/content-layout'
import { Card, CardHeader } from '@/components/ui/card'
import { CategoriesTable } from './components/categories-table'
import { Category } from '@/zod'
import { useCategoriesStore } from '@/stores/categories'

async function getData(): Promise<Category[]> {
  return [
    { id: '728ed52f', name: 'Clothing' },
    { id: 'a1b2c3d4', name: 'Electronics' },
    { id: 'e5f6g7h8', name: 'Home & Kitchen' },
    { id: 'i9j0k1l2', name: 'Sports & Outdoors' },
    { id: 'm3n4o5p6', name: 'Toys & Games' },
    { id: 'q7r8s9t0', name: 'Beauty & Personal Care' },
    { id: 'u1v2w3x4', name: 'Books' },
    { id: 'y5z6a7b8', name: 'Automotive' },
    { id: 'c9d0e1f2', name: 'Health & Wellness' },
    { id: 'g3h4i5j6', name: 'Jewelry' }
  ]
}

export default function CategoriesPage() {
  // const data = await getData()
  const data = useCategoriesStore((state) => state.categories)

  return (
    <ContentLayout title="All Categories">
      <Card className="w-full">
        <CardHeader></CardHeader>
        <CategoriesTable data={data} />
      </Card>
    </ContentLayout>
  )
}
