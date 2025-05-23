import { Price } from '@/types/Products.ts'

export interface BasketItem {
    basket_item_id: number
    price_id: number
    quantity: number
    price: Price
}

export interface Basket {
    basket_id: number
    user_id: number
    items: BasketItem[]
    total_price: number
}
