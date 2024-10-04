import { useQuery } from '@tanstack/react-query'
import { productsRepository } from '../repositories'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

export function useProductsQuery(offset = 0, limit = 10) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, offset, limit],
    queryFn: () => productsRepository.getAll(offset, limit)
  })
}

export function useProductQuery(id: number) {
  return useQuery({
    enabled: !!id,
    queryKey: [PRODUCTS_QUERY_KEY, id],
    queryFn: () => productsRepository.get(id)
  })
}
