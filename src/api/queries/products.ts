import { useProductsStore } from '@/stores/products'
import { useQuery } from '@tanstack/react-query'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'
export function useProductsQuery() {
  const products = useProductsStore((state) => state.products)

  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn() {
      return products
    }
  })
}
