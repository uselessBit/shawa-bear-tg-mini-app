import { createContext, useContext, useEffect, useState } from 'react'
import { Basket } from '@/types/Basket'
import { BasketService } from '@/api/BasketService'
import { ProductService } from '@/api/ProductService'
import { Price, Ingredient } from '@/types/Products'

export type PriceWithQuantity = Price & {
    quantity: number
    basket_item_id: number
    excluded_ingredient_names: string[]
}

type BasketContextType = {
    basket: Basket | null
    loading: boolean
    error: string
    basketPrices: PriceWithQuantity[]
    refreshBasket: () => Promise<void>
    addToBasket: (
        priceId: number,
        quantity: number,
        excludedIngredientIds: number[]
    ) => Promise<boolean>
    updateQuantity: (basketItemId: number, quantity: number) => Promise<void>
    clearError: () => void
    removeFromBasket: (basketItemId: number) => Promise<Basket | null>
    addCustomProduct: (
        ingredients: Ingredient[],
        totalPrice: number
    ) => Promise<boolean>
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
    addCustomProduct: async () => false,
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
        const loadData = async () => {
            try {
                const [prices] = await Promise.all([
                    ProductService.fetchAllPrices(),
                    ProductService.fetchAllIngredients(),
                ])
                setAllPrices(prices)
            } catch (err) {
                console.error('Ошибка загрузки данных:', err)
            }
        }
        loadData()
    }, [])

    const getBasketPrices = (): PriceWithQuantity[] => {
        if (!basket || !allPrices.length) return []

        const ingredients = ProductService.getCachedIngredients() || []
        const ingredientMap = new Map<number, string>(
            ingredients.map((i) => [i.ingredient_id, i.name])
        )

        return basket.items
            .map((item) => {
                const price = allPrices.find(
                    (p) => p.price_id === item.price_id
                )
                if (!price) return null

                const excludedNames = item.excluded_ingredient_ids.map(
                    (id) => ingredientMap.get(id) || `Ингредиент #${id}`
                )

                return {
                    ...price,
                    quantity: item.quantity,
                    basket_item_id: item.basket_item_id,
                    excluded_ingredient_names: excludedNames,
                }
            })
            .filter((p): p is PriceWithQuantity => !!p)
            .sort((a, b) => {
                const priceCompare = a.price - b.price
                if (priceCompare !== 0) return priceCompare

                const nameCompare = a.product.name.localeCompare(b.product.name)
                if (nameCompare !== 0) return nameCompare

                return (
                    b.excluded_ingredient_names.length -
                    a.excluded_ingredient_names.length
                )
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
        quantity: number = 1,
        excludedIngredientIds: number[] = []
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

            await BasketService.addItem(
                userId,
                priceId,
                quantity,
                excludedIngredientIds
            )
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

    const addCustomProduct = async (
        ingredients: Ingredient[],
        totalPrice: number
    ): Promise<boolean> => {
        setLoading(true)
        setError('')

        try {
            // 1. Создать размер
            const totalGrams = ingredients.reduce(
                (sum, ing) => sum + (ing.grams || 0),
                0
            )
            const size = await ProductService.createSize({
                name: 'Custom',
                grams: totalGrams,
            })

            // 2. Создать продукт
            const product = await ProductService.createProduct({
                name: 'Конструктор',
                description: '',
                category_id: 1,
                ingredients: ingredients,
            })

            // 3. Создать цену
            const price = await ProductService.createPrice({
                size_id: size.size_id,
                product_id: product.product_id,
                price: totalPrice,
                proteins: 0,
                fats: 0,
                carbohydrates: 0,
                calories: 0,
                is_custom: true,
            })

            // 4. Добавить в корзину
            return await addToBasket(price.price_id, 1, [])
        } catch (err) {
            setError('Ошибка создания кастомного продукта')
            console.error('Ошибка создания кастомного продукта:', err)
            return false
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
                addCustomProduct,
            }}
        >
            {children}
        </BasketContext.Provider>
    )
}

export const useBasketContext = () => useContext(BasketContext)
