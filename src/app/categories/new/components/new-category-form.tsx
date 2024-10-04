'use client'

import { useAddCategoryMutation, useDestroyCategoryMutation, useUpdateCategoryMutation } from '@/api/mutations'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type Category, CategorySchema } from '@/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { confirmAction } from '@/lib/confirm-action'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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

  useEffect(() => {
    form.reset(defaultData)
  }, [form, defaultData])

  const { mutate: addCategory } = useAddCategoryMutation()
  const { mutate: updateCategory } = useUpdateCategoryMutation()
  const { mutate: destroyCategory } = useDestroyCategoryMutation()

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
        { category, id: defaultData?.id as Pick<Category, 'id'> },
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

  const router = useRouter()
  function destroy() {
    confirmAction(
      `Are you sure you want to remove the category ${defaultData?.name}?`,
      {
        label: 'Yes, remove',
        onClick() {
          destroyCategory(defaultData?.id as Pick<Category, 'id'>, {
            onSuccess() {
              toast(`Category ${defaultData?.name} was removed!`, { icon: <CheckCircle /> })
              router.push('/categories')
            },
            onError() {
              toast('An error occurred while removing the category', { icon: <X /> })
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
                    <Input placeholder="Clothing" {...field} />
                  </FormControl>
                  <FormDescription>Category name, this will be displayed in the category list</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex justify-start gap-1">
          <Button type="submit">{mode === 'create' ? 'Add new category' : 'Save changes'}</Button>
          {mode === 'edit' && (
            <Button type="button" variant="destructive" onClick={destroy}>
              Remove Category
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
