import { useQuery } from '@tanstack/react-query'
import { categoriesRepository } from '../repositories'

export const CATEGORIES_QUERY_KEY = 'CATEGORIES_QUERY_KEY'

export function useCategoriesQuery(offset = 0, limit = 10) {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, offset, limit],
    queryFn: () => categoriesRepository.getAll(offset, limit)
  })
}

export function useCategoryQuery(id: number) {
  return useQuery({
    enabled: !!id,
    queryKey: [CATEGORIES_QUERY_KEY, id],
    queryFn: () => categoriesRepository.get(id)
  })
}
