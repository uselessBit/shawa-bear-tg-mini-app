import { createContext, useContext, useEffect, useState } from 'react'
import { Basket } from '@/types/Basket'
import { BasketService } from '@/api/BasketService'

type BasketContextType = {
    basket: Basket | null
    loading: boolean
    error: string
    refreshBasket: () => Promise<void>
    addToBasket: (priceId: number, quantity: number) => Promise<void>
}

const BasketContext = createContext<BasketContextType>({
    basket: null,
    loading: false,
    error: '',
    refreshBasket: async () => {},
    addToBasket: async () => {},
})

export const BasketProvider = ({
    children,
    userId,
}: {
    children: React.ReactNode
    userId: number
}) => {
    const [basket, setBasket] = useState<Basket | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const refreshBasket = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await BasketService.getBasket(userId)
            setBasket(data)
        } catch (err) {
            setError('Ошибка обновления корзины')
            console.error('Ошибка обновления корзины:', err)
        } finally {
            setLoading(false)
        }
    }

    const addToBasket = async (priceId: number, quantity: number = 1) => {
        setLoading(true)
        setError('')
        try {
            await BasketService.addItem(userId, priceId, quantity)
            await refreshBasket()
        } catch (err) {
            setError('Ошибка добавления в корзину')
            console.error('Ошибка добавления в корзину:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshBasket()
    }, [userId])

    return (
        <BasketContext.Provider
            value={{ basket, loading, error, refreshBasket, addToBasket }}
        >
            {children}
        </BasketContext.Provider>
    )
}

export const useBasketContext = () => useContext(BasketContext)
