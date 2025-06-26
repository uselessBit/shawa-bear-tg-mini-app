import axios from 'axios'
import API_BASE_URL from '@/config'
import { Basket } from '@/types/Basket'

export const OrderService = {
    createOrder: async (
        userId: number,
        orderData: {
            basket_id: number
            payment_option: 'card' | 'cash'
            time_taken: string
            comment: string
            status: 'created' | 'in_progress' | 'completed' | 'canceled'
            first_name: string
            address: string
            phone: string
            discount: number
        }
    ): Promise<Basket> => {
        const response = await axios.post<Basket>(
            `${API_BASE_URL}api/v1/order?user_id=${userId}`,
            orderData
        )
        return response.data
    },
}
