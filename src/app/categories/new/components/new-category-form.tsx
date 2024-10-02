'use client'

import { useAddCategoryMutation, useEditCategoryMutation } from '@/api/mutations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Category, CategorySchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
    if (mode === 'create') {
      const category: Omit<Category, 'id'> = { name: values.name }
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
      const category: Omit<Category, 'id'> = { name: values.name }
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

  function removeProductFromCategory(id: string) {
    console.log(`removing ${id}`)
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

        <Card>
          <CardContent>
            <CardTitle>Products</CardTitle>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex items-center gap-2">
                  <div>1.</div>
                  <div className="flex-1">Jeans</div>
                  <div className="">
                    <Button type="button" variant={'ghost'} onClick={() => removeProductFromCategory('82fd4b7a')}>
                      <X className="text-gray-400" size={16} />
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start">
          <Button type="submit">{mode === 'create' ? 'Add new category' : 'Save changes'}</Button>
        </div>
      </form>
    </Form>
  )
}
