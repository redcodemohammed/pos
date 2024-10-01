'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newItemFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 letters')
    .max(255, 'Name cannot container more than 255 letters'),
  price: z.coerce
    .number({ invalid_type_error: 'Price is required' })
    .min(1, 'Price cannot be less than 1 IQD')
    .max(1000000, 'Price cannot be more than 1000000 IQD'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity is required' })
    .min(1, 'Quantity cannot be less than 1')
    .max(1000, 'Quantity cannot be more than 1000'),
  category: z.string().optional()
})

export function NewItemForm() {
  const form = useForm<z.infer<typeof newItemFormSchema>>({
    resolver: zodResolver(newItemFormSchema),
    defaultValues: {
      name: ''
    },
    shouldFocusError: true
  })

  function onSubmit(values: z.infer<typeof newItemFormSchema>) {
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
          <Button type="submit">Add new item</Button>
        </div>
      </form>
    </Form>
  )
}
