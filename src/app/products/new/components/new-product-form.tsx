'use client'

import { useAddProductMutation, useEditProductMutation } from '@/api/mutations'
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
import { type Product, ProductSchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
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

  const { mutate: addProduct } = useAddProductMutation()
  const { mutate: updateProduct } = useEditProductMutation()
  const { data: categories, isPending } = useCategoriesQuery()

  function onSubmit(values: Product) {
    const product: Omit<Product, 'id'> = {
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      category: values.category
    }
    if (mode === 'create') {
      addProduct(product, {
        onSuccess() {
          form.reset({ name: '', price: 0, quantity: 0, category: '' })
          toast(`Product ${values.name} was added!`, { icon: <CheckCircle /> })
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (IQD)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.000" {...field} prefix="dsd" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} prefix="dsd" type="number" />
                  </FormControl>
                  <FormDescription>The quantity of the product you have in stock.</FormDescription>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                              <SelectItem key={category.id} value={category.id as string}>
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

        <div className="flex justify-start">
          <Button type="submit">{mode === 'create' ? 'Add new product' : 'Save changes'}</Button>
        </div>
      </form>
    </Form>
  )
}
