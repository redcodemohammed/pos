import { useCategoriesStore } from '@/stores/categories'
import { Category } from '@/zod'
import { useQuery } from '@tanstack/react-query'
import { filter, TypedFilters } from '../api'

export const CATEGORIES_QUERY_KEY = 'CATEGORIES_QUERY_KEY'

export function useCategoriesQuery(filters?: TypedFilters<Category>) {
  const categories = useCategoriesStore((state) => state.categories)

  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn() {
      return filter(categories, filters)
    }
  })
}
