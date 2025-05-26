import { Price } from '@/types/Products.ts'

export interface BasketItem {
    basket_item_id: number
    price_id: number
    quantity: number
    price: Price
    excluded_ingredient_ids: number[]
}

export interface Basket {
    basket_id: number
    user_id: number
    items: BasketItem[]
    total_price: number
}

export type OrderStatus = 'created' | 'in_progress' | 'completed' | 'canceled'

export type PaymentOption = 'card' | 'cash'

export interface Order {
    order_id: number
    basket_id: number
    payment_option: PaymentOption
    time_taken: string
    comment: string
    status: OrderStatus
    first_name: string
    address: string
    phone: string
    created_at: string
}
