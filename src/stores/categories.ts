import { Category } from '@/zod'
import { create } from 'zustand'

type CategoriesStore = {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  updateCategory: (id: Pick<Category, 'id'>, category: Category) => void
  destroyCategory: (id: Pick<Category, 'id'>) => void
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => {
      const newCategory = { id: state.categories.length.toString(), ...category }
      return { categories: [...state.categories, newCategory] }
    }),
  updateCategory: (id, category) =>
    set((state) => ({
      categories: state.categories.map((c) => (c.id === id ? category : c))
    })),
  destroyCategory: (id) => set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }))
}))
