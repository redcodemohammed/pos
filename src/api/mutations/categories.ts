import { useCategoriesStore } from '@/stores/categories'
import { Category } from '@/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CATEGORIES_QUERY_KEY } from '../queries'

export const ADD_CATEGORY_MUTATION_KEY = 'ADD_CATEGORY_MUTATION_KEY'
export const EDIT_CATEGORY_MUTATION_KEY = 'EDIT_CATEGORY_MUTATION_KEY'
export const DESTROY_CATEGORY_MUTATION_KEY = 'DESTROY_CATEGORY_MUTATION_KEY'

export function useAddCategoryMutation() {
  const queryClient = useQueryClient()

  const addCategory = useCategoriesStore((state) => state.addCategory)

  return useMutation({
    mutationKey: [ADD_CATEGORY_MUTATION_KEY],
    mutationFn: (category: Readonly<Omit<Category, 'id'>>) => {
      return new Promise((resolve) => {
        resolve(addCategory(category))
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
    }
  })
}

export function useEditCategoryMutation() {
  const queryClient = useQueryClient()

  const updateCategory = useCategoriesStore((state) => state.updateCategory)

  return useMutation({
    mutationKey: [EDIT_CATEGORY_MUTATION_KEY],
    mutationFn: ({ id, category }: { id: Pick<Category, 'id'>; category: Readonly<Omit<Category, 'id'>> }) => {
      return new Promise((resolve) => {
        resolve(updateCategory(id, category))
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
    }
  })
}

export function useDestroyCategoryMutation() {
  const queryClient = useQueryClient()

  const destroyCategory = useCategoriesStore((state) => state.destroyCategory)

  return useMutation({
    mutationKey: [DESTROY_CATEGORY_MUTATION_KEY],
    mutationFn: (id: Pick<Category, 'id'>) => {
      return new Promise((resolve) => {
        resolve(destroyCategory(id))
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
    }
  })
}
