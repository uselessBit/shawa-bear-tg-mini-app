import { useState, useEffect } from 'react'
import { BasketService, Basket } from '@/api/BasketService'

export const useBasket = (userId: number) => {
    const [basket, setBasket] = useState<Basket | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchBasket = async () => {
        try {
            const data = await BasketService.getBasket(userId)
            setBasket(data)
        } catch (err) {
            setError(
                `Ошибка загрузки корзины: ${err instanceof Error ? err.message : err}`
            )
        } finally {
            setLoading(false)
        }
    }

    const addToBasket = async (priceId: number, quantity: number = 1) => {
        setLoading(true)
        try {
            await BasketService.addItem(userId, priceId, quantity)
            await fetchBasket()
        } catch (err) {
            setError(
                `Ошибка добавления в корзину: ${err instanceof Error ? err.message : err}`
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBasket()
    }, [userId])

    return {
        basket,
        loading,
        error,
        addToBasket,
        refreshBasket: fetchBasket,
    }
}
