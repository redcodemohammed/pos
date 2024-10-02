import { useProductsStore } from '@/stores/products'
import { Product } from '@/zod'
import { useQuery } from '@tanstack/react-query'
import { filter, TypedFilters } from '../api'

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY'

export function useProductsQuery(filters?: TypedFilters<Product>) {
  const products = useProductsStore((state) => state.products)

  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: () => {
      // Apply filters to products
      return filter(products, filters)
    }
  })
}
