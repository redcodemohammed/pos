'use client'

import { useAddCategoryMutation, useEditCategoryMutation } from '@/api/mutations'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Category, CategorySchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ProductsList } from './products-list'

interface NewCategoryFormProps {
  mode: 'create' | 'edit'
  defaultData?: Category
}

export function NewCategoryForm({ mode, defaultData }: NewCategoryFormProps) {
  const form = useForm<Category>({
    resolver: zodResolver(CategorySchema),
    defaultValues: defaultData,
    shouldFocusError: true
  })

  const { mutate: addCategory } = useAddCategoryMutation()
  const { mutate: updateCategory } = useEditCategoryMutation()

  function onSubmit(values: Category) {
    const category: Omit<Category, 'id'> = { name: values.name }
    if (mode === 'create') {
      addCategory(category, {
        onSuccess() {
          form.reset({ name: '' })
          toast(`Category ${values.name} was added!`, { icon: <CheckCircle /> })
        },
        onError() {
          toast('An error occurred while adding the category', { icon: <X /> })
        }
      })
    } else {
      updateCategory(
        { category, id: defaultData?.id as string },
        {
          onSuccess() {
            toast(`Category ${values.name} was updated!`, { icon: <CheckCircle /> })
          },
          onError() {
            toast('An error occurred while updating the category', { icon: <X /> })
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
                    <Input placeholder="Clothing" {...field} />
                  </FormControl>
                  <FormDescription>Category name, this will be displayed in the category list</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex justify-start">
          <Button type="submit">{mode === 'create' ? 'Add new category' : 'Save changes'}</Button>
        </div>
        {mode === 'edit' && <ProductsList id={defaultData?.id as string} />}
      </form>
    </Form>
  )
}
