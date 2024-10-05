import { ProductEntity } from './product'

export interface CartItemEntity {
  id: number
  cart_id: number
  cost_price: number
  description: string
  images: string
  name: string
  product: ProductEntity
  product_id: number
  quantity: number
  sale_price: number
  created_at: string
  updated_at: string
}
