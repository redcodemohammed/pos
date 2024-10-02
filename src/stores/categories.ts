import { Category } from '@/zod'
import { create } from 'zustand'

type CategoriesStore = {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, category: Category) => void
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
    }))
}))
