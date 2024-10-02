import { useEditProductMutation } from '@/api/mutations'
import { useProductsQuery } from '@/api/queries'
import QueryStateDisplay from '@/components/query-state-display'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'
import { toast } from 'sonner'

interface ProductsListProps {
  id: string
}

export function ProductsList({ id }: ProductsListProps) {
  const {
    data: products,
    isPending,
    isSuccess,
    isError,
    error,
    refetch
  } = useProductsQuery({
    filters: { category: { value: id, operator: 'eq' } }
  })

  const { mutate: editProduct } = useEditProductMutation()
  function removeProductFromCategory(id: string) {
    editProduct(
      {
        id,
        product: {
          category: ''
        }
      },
      {
        onSuccess() {
          toast('Product was removed from the category')
        },
        onError() {
          toast('An error occurred while removing the product from the category')
        }
      }
    )
  }

  return (
    <Card>
      <CardContent>
        <CardTitle>Products</CardTitle>
        <QueryStateDisplay
          error={error}
          isError={isError}
          isLoading={isPending}
          isSuccess={isSuccess}
          refresh={refetch}
          fallback={
            <div className="space-y-4 mt-4">
              {products?.map((p, index) => (
                <div key={p.id}>
                  <div className="flex items-center gap-2">
                    <div>{index + 1}.</div>
                    <div className="flex-1">{p.name}</div>
                    <div className="">
                      <Button type="button" variant={'ghost'} onClick={() => removeProductFromCategory(p.id as string)}>
                        <X className="text-gray-400" size={16} />
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          }
        />
      </CardContent>
    </Card>
  )
}
