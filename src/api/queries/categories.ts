import { useCategoriesStore } from '@/stores/categories'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const CATEGORIES_QUERY_KEY = 'CATEGORIES_QUERY_KEY'
export function useCategoriesQuery() {
  const categories = useCategoriesStore((state) => state.categories)

  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn() {
      return categories
    }
  })
}
