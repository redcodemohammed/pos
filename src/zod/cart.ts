import { CartItemEntity } from './cart-item'

export interface CartEntity {
  id: number
  user_id: number
  items: CartItemEntity[]
  items_quantity: number
  total_amount: number
  created_at: string
  updated_at: string
}
