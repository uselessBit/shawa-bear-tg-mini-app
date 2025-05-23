import axios from 'axios'
import API_BASE_URL from '@/config'
import { Basket } from '@/types/Basket'

export const BasketService = {
    async addItem(
        userId: number,
        priceId: number,
        quantity: number = 1
    ): Promise<void> {
        await axios.post(
            `${API_BASE_URL}api/v1/basket/add_item?user_id=${userId}`,
            { price_id: priceId, quantity }
        )
    },

    async getBasket(userId: number): Promise<Basket> {
        const response = await axios.get<Basket>(
            `${API_BASE_URL}api/v1/basket/${userId}`
        )
        return response.data
    },
}
