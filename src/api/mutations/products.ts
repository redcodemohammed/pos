import { Product } from '@/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PRODUCTS_QUERY_KEY } from '../queries'
import { productsRepository } from '../repositories'

export const ADD_PRODUCT_MUTATION_KEY = 'ADD_PRODUCT_MUTATION_KEY'
export const EDIT_PRODUCT_MUTATION_KEY = 'EDIT_PRODUCT_MUTATION_KEY'
export const DESTROY_PRODUCT_MUTATION_KEY = 'DESTROY_PRODUCT_MUTATION_KEY'

export function useAddProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [ADD_PRODUCT_MUTATION_KEY],
    mutationFn: (product: Readonly<Omit<Product, 'id'>>) => {
      return productsRepository.create(product)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
    }
  })
}

export function useEditProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EDIT_PRODUCT_MUTATION_KEY],
    mutationFn: ({ id, product }: { id: Pick<Product, 'id'>; product: Readonly<Partial<Omit<Product, 'id'>>> }) => {
      return productsRepository.update(id as number, product)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
    }
  })
}

export function useDestroyProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [DESTROY_PRODUCT_MUTATION_KEY],
    mutationFn: (id: Pick<Product, 'id'>) => {
      return productsRepository.destroy(id as number)
    },
    onSuccess() {
      queryClient.removeQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
    }
  })
}
