import { createContext, useContext, useEffect, useState } from 'react'
import { Basket } from '@/types/Basket'
import { BasketService } from '@/api/BasketService'
import { ProductService } from '@/api/ProductService'
import { Price } from '@/types/Products'

type PriceWithQuantity = Price & { quantity: number }

type BasketContextType = {
    basket: Basket | null
    loading: boolean
    error: string
    basketPrices: PriceWithQuantity[]
    refreshBasket: () => Promise<void>
    addToBasket: (priceId: number, quantity: number) => Promise<void>
}

const BasketContext = createContext<BasketContextType>({
    basket: null,
    loading: false,
    error: '',
    basketPrices: [],
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
    const [allPrices, setAllPrices] = useState<Price[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadPrices = async () => {
            try {
                const prices = await ProductService.fetchAllPrices()
                setAllPrices(prices)
            } catch (err) {
                console.error('Ошибка загрузки цен:', err)
            }
        }
        loadPrices()
    }, [])

    const getBasketPrices = (): PriceWithQuantity[] => {
        if (!basket || !allPrices.length) return []
        return basket.items
            .map((item) => {
                const price = allPrices.find(
                    (p) => p.price_id === item.price_id
                )
                return price ? { ...price, quantity: item.quantity } : null
            })
            .filter((p): p is PriceWithQuantity => !!p)
    }

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
            value={{
                basket,
                loading,
                error,
                basketPrices: getBasketPrices(),
                refreshBasket,
                addToBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    )
}

export const useBasketContext = () => useContext(BasketContext)
