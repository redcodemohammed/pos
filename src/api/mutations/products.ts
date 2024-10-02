import { useProductsStore } from '@/stores/products'
import { Product } from '@/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PRODUCTS_QUERY_KEY } from '../queries'

export const ADD_PRODUCT_MUTATION_KEY = 'ADD_PRODUCT_MUTATION_KEY'
export const EDIT_PRODUCT_MUTATION_KEY = 'EDIT_PRODUCT_MUTATION_KEY'

export function useAddProductMutation() {
  const queryClient = useQueryClient()

  const addProduct = useProductsStore((state) => state.addProduct)

  return useMutation({
    mutationKey: [ADD_PRODUCT_MUTATION_KEY],
    mutationFn: (product: Readonly<Omit<Product, 'id'>>) => {
      return new Promise((resolve) => {
        resolve(addProduct(product))
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
    }
  })
}

export function useEditProductMutation() {
  const queryClient = useQueryClient()

  const updateProduct = useProductsStore((state) => state.updateProduct)

  return useMutation({
    mutationKey: [EDIT_PRODUCT_MUTATION_KEY],
    mutationFn: ({ id, product }: { id: string; product: Readonly<Omit<Product, 'id'>> }) => {
      return new Promise((resolve) => {
        resolve(updateProduct(id, product))
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
    }
  })
}
