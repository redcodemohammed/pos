'use client'

import { useAddProductMutation, useDestroyProductMutation, useEditProductMutation } from '@/api/mutations'
import { useCategoriesQuery } from '@/api/queries'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { confirmAction } from '@/lib/confirm-action'
import { type Product, ProductSchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface NewProductFormProps {
  mode: 'create' | 'edit'
  defaultData?: Product
}

export function NewProductForm({ mode, defaultData }: NewProductFormProps) {
  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultData,
    shouldFocusError: true
  })

  useEffect(() => {
    form.reset(defaultData)
  }, [defaultData, form])

  const { mutate: addProduct } = useAddProductMutation()
  const { mutate: updateProduct } = useEditProductMutation()
  const { mutate: destroyProduct } = useDestroyProductMutation()
  const { data: categories, isPending } = useCategoriesQuery()

  function onSubmit(values: Product) {
    const product: Omit<Product, 'id'> = {
      name: values.name,
      category_id: values.category_id,
      cost_price: values.cost_price,
      sale_price: values.sale_price
    }
    if (mode === 'create') {
      addProduct(product, {
        onSuccess() {
          form.reset({ name: '', sale_price: 0, cost_price: 0, category_id: undefined })
          toast(`Product ${values.name} was added!`, {
            icon: <CheckCircle />,
            action: {
              label: 'View all products',
              onClick() {
                router.push('/products')
              }
            }
          })
        },
        onError() {
          toast('An error occurred while adding the product', { icon: <X /> })
        }
      })
    } else {
      updateProduct(
        {
          id: defaultData?.id as Pick<Product, 'id'>,
          product
        },
        {
          onSuccess() {
            toast(`Product ${values.name} was updated!`, { icon: <CheckCircle /> })
          },
          onError() {
            toast('An error occurred while updating the product', { icon: <X /> })
          }
        }
      )
    }
  }

  const router = useRouter()
  function destroy() {
    confirmAction(
      `Are you sure you want to remove the product ${defaultData?.name}?`,
      {
        label: 'Yes, remove',
        onClick() {
          destroyProduct(defaultData?.id as Pick<Product, 'id'>, {
            onSuccess() {
              toast(`Product ${defaultData?.name} was removed!`, { icon: <CheckCircle /> })
              router.push('/products')
            },
            onError() {
              toast('An error occurred while removing the product', { icon: <X /> })
            }
          })
        }
      },
      defaultData?.id?.toString()
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:max-w-sm space-y-6">
        <Card className="space-y-4">
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Keyboard" {...field} />
                  </FormControl>
                  <FormDescription>The product name is what will be shown to the customers.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Price (IQD)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.000" {...field} prefix="dsd" type="number" />
                  </FormControl>
                  <FormDescription>The cost price is the price that you paid for the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sale_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price (IQD)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.000" {...field} prefix="dsd" type="number" />
                  </FormControl>
                  <FormDescription>
                    The sale price is the price that the customer will pay for the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {isPending ? (
                          <SelectLabel>Loading....</SelectLabel>
                        ) : (
                          <>
                            <SelectLabel>Categories</SelectLabel>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id?.toString() as string}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The category of the product helps you organize your products and make it easier for customers to
                    find them.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-start gap-1">
          <Button type="submit">{mode === 'create' ? 'Add new product' : 'Save changes'}</Button>
          {mode === 'edit' && (
            <Button type="button" variant="destructive" onClick={destroy}>
              Remove Product
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
