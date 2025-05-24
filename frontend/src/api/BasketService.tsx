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

    async changeQuantity(
        basketItemId: number,
        quantity: number
    ): Promise<void> {
        await axios.post(`${API_BASE_URL}api/v1/basket/change_quantity`, {
            basket_item_id: basketItemId,
            quantity,
        })
    },

    async removeItem(basketItemId: number): Promise<void> {
        await axios.delete(
            `${API_BASE_URL}api/v1/basket/remove_item/${basketItemId}`
        )
    },
}
