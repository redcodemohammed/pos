'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Product, ProductSchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

  function onSubmit(values: Product) {
    console.log(values)
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
                    <SelectContent></SelectContent>
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
