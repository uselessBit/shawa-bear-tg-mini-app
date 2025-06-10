import axios from 'axios'
import API_BASE_URL from '@/config'

export interface User {
    user_id: number
    first_name: string
    username?: string
    phone?: string
    address?: string
    is_admin: boolean
    coins: number
}

export interface OrderHistory {
    order_id: number
    basket_id: number
    order_date: string
    payment_option: string
    time_taken: string
    total_price: number
    comment: string
    status: string
    first_name: string
    address: string
    phone: string
    items: {
        order_item_id: number
        price_id: number
        quantity: number
        excluded_ingredient_ids: number[]
    }[]
}

export const UserService = {
    getUserById: async (userId: number): Promise<User> => {
        try {
            const response = await axios.get<User>(
                `${API_BASE_URL}api/v1/users/get_user_by_id?user_id=${userId}`
            )
            return response.data
        } catch (error) {
            console.error('Error fetching user:', error)
            throw error
        }
    },

    getOrderHistory: async (userId: number): Promise<OrderHistory[]> => {
        try {
            const response = await axios.get<OrderHistory[]>(
                `${API_BASE_URL}api/v1/order/?user_id=${userId}`
            )
            return response.data
        } catch (error) {
            console.error('Error fetching order history:', error)
            throw error
        }
    },
}
