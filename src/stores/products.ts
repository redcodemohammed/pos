import { Product } from '@/zod'
import { create } from 'zustand'

type ProductsStore = {
  products: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: Pick<Product, 'id'>, category: Partial<Omit<Product, 'id'>>) => void
  destroyProduct: (id: Pick<Product, 'id'>) => void
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products: products }),
  addProduct: (product) =>
    set((state) => {
      const newProduct = { id: state.products.length.toString(), ...product }
      return { products: [...state.products, newProduct] }
    }),
  updateProduct: (id, product) =>
    set((state) => ({
      products: state.products.map((p) => {
        if (p.id === id) return { ...p, ...product }
        else return p
      })
    })),
  destroyProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) }))
}))
