import { Category } from '@/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CATEGORIES_QUERY_KEY } from '../queries'
import { categoriesRepository } from '../repositories'

export const ADD_CATEGORY_MUTATION_KEY = 'ADD_CATEGORY_MUTATION_KEY'
export const EDIT_CATEGORY_MUTATION_KEY = 'EDIT_CATEGORY_MUTATION_KEY'
export const DESTROY_CATEGORY_MUTATION_KEY = 'DESTROY_CATEGORY_MUTATION_KEY'

export function useAddCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [ADD_CATEGORY_MUTATION_KEY],
    mutationFn: (category: Readonly<Omit<Category, 'id'>>) => {
      return categoriesRepository.create(category)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
    }
  })
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EDIT_CATEGORY_MUTATION_KEY],
    mutationFn: ({ id, category }: { id: Pick<Category, 'id'>; category: Readonly<Partial<Omit<Category, 'id'>>> }) => {
      return categoriesRepository.update(id as number, category)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
    }
  })
}

export function useDestroyCategoryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [DESTROY_CATEGORY_MUTATION_KEY],
    mutationFn: (id: Pick<Category, 'id'>) => {
      return categoriesRepository.destroy(id as number)
    },
    onSuccess() {
      queryClient.removeQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
    }
  })
}
