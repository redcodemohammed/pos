import { Product } from '@/zod'
import { create } from 'zustand'

type ProductsStore = {
  products: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, category: Product) => void
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
      products: state.products.map((p) => (p.id === id ? product : p))
    }))
}))
