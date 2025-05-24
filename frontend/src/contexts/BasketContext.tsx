import { createContext, useContext, useEffect, useState } from 'react'
import { Basket } from '@/types/Basket'
import { BasketService } from '@/api/BasketService'
import { ProductService } from '@/api/ProductService'
import { Price } from '@/types/Products'

export type PriceWithQuantity = Price & {
    quantity: number
    basket_item_id: number
}

type BasketContextType = {
    basket: Basket | null
    loading: boolean
    error: string
    basketPrices: PriceWithQuantity[]
    refreshBasket: () => Promise<void>
    addToBasket: (priceId: number, quantity: number) => Promise<boolean>
    updateQuantity: (basketItemId: number, quantity: number) => Promise<void>
    clearError: () => void
    removeFromBasket: (basketItemId: number) => Promise<Basket | null>
}

const BasketContext = createContext<BasketContextType>({
    basket: null,
    loading: false,
    error: '',
    basketPrices: [],
    refreshBasket: async () => {},
    addToBasket: async () => false,
    updateQuantity: async () => {},
    clearError: () => {},
    removeFromBasket: async () => null,
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
                return price
                    ? {
                          ...price,
                          quantity: item.quantity,
                          basket_item_id: item.basket_item_id,
                      }
                    : null
            })
            .filter((p): p is PriceWithQuantity => !!p)
            .sort((a, b) => {
                const priceCompare = a.price - b.price
                if (priceCompare !== 0) return priceCompare

                return a.product.name.localeCompare(b.product.name)
            })
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

    const addToBasket = async (
        priceId: number,
        quantity: number = 1
    ): Promise<boolean> => {
        setLoading(true)
        setError('')
        try {
            const existingItem = basket?.items.find(
                (item) => item.price_id === priceId
            )
            const currentQuantity = existingItem?.quantity || 0
            const newTotal = currentQuantity + quantity

            if (newTotal > 99) {
                setError('Максимальное количество товара в корзине - 99')
                return false
            }

            await BasketService.addItem(userId, priceId, quantity)
            await refreshBasket()
            return true
        } catch (err) {
            setError('Ошибка добавления в корзину')
            console.error('Ошибка добавления в корзину:', err)
            return false
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (basketItemId: number, quantity: number) => {
        setLoading(true)
        setError('')
        try {
            if (quantity > 99) {
                setError('Максимальное количество товара - 99')
                return
            }

            await BasketService.changeQuantity(basketItemId, quantity)
            await refreshBasket()
        } catch (err) {
            setError('Ошибка изменения количества')
            console.error('Ошибка изменения количества:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshBasket()
    }, [userId])

    const clearError = () => setError('')

    const removeFromBasket = async (basketItemId: number) => {
        setLoading(true)
        setError('')
        try {
            await BasketService.removeItem(basketItemId)
            const updatedBasket = await BasketService.getBasket(userId)
            setBasket(updatedBasket)
            return updatedBasket
        } catch (err) {
            setError('Ошибка удаления товара')
            console.error('Ошибка удаления товара:', err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return (
        <BasketContext.Provider
            value={{
                basket,
                loading,
                error,
                basketPrices: getBasketPrices(),
                refreshBasket,
                addToBasket,
                updateQuantity,
                clearError,
                removeFromBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    )
}

export const useBasketContext = () => useContext(BasketContext)
