import { ContentLayout } from '@/components/dashboard/content-layout'
import { NewItemForm } from './components/new-item-form'

export default function ProductNewPage() {
  return (
    <ContentLayout title="New Product">
      <NewItemForm />
    </ContentLayout>
  )
}
