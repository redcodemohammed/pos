import { Category } from '@/zod'
import { create } from 'zustand'

type CategoriesStore = {
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories })
}))
