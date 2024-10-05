import { CategoryEntity, ProductEntity } from '@/zod'
import { BaseRepository } from './base-repository'

export const categoriesRepository = new BaseRepository<CategoryEntity>('categories')
export const productsRepository = new BaseRepository<ProductEntity>('products')
