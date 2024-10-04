import { Category, Product } from '@/zod'
import { BaseRepository } from './base-repository'

export const categoriesRepository = new BaseRepository<Category>('categories')
export const productsRepository = new BaseRepository<Product>('products')
