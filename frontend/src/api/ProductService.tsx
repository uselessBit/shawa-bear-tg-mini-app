import axios from 'axios'
import { Price, Category, Ingredient } from '@/types/Products'
import API_BASE_URL from '@/config'

let cachedPrices: Price[] | null = null
let cachedCategories: Category[] | null = null
let cachedIngredients: Ingredient[] | null = null

export const ProductService = {
    fetchAllPrices: async (): Promise<Price[]> => {
        if (cachedPrices) return cachedPrices

        try {
            const response = await axios.get<Price[]>(
                `${API_BASE_URL}api/v1/price/`
            )
            cachedPrices = response.data
            return cachedPrices
        } catch (error) {
            console.error('Error fetching prices:', error)
            throw error
        }
    },

    getUniqueProducts: (): Price[] => {
        if (!cachedPrices) throw new Error('Data not loaded')

        return Array.from(
            cachedPrices
                .reduce((map, price) => {
                    const existing = map.get(price.product.product_id)
                    if (!existing || price.price < existing.price) {
                        map.set(price.product.product_id, price)
                    }
                    return map
                }, new Map<number, Price>())
                .values()
        )
    },

    getProductsByCategory: (category: string): Price[] => {
        return ProductService.getUniqueProducts().filter(
            (price) => price.product.category.name === category
        )
    },

    fetchCategories: async (): Promise<Category[]> => {
        if (cachedCategories) return cachedCategories

        try {
            const response = await axios.get<Category[]>(
                `${API_BASE_URL}api/v1/category/`
            )
            cachedCategories = response.data
            return cachedCategories
        } catch (error) {
            console.error('Error fetching categories:', error)
            throw error
        }
    },

    getAllPricesForProduct: (productId: number): Price[] => {
        if (!cachedPrices) return []

        return cachedPrices.filter(
            (price) => price.product.product_id === productId
        )
    },

    fetchAllIngredients: async (): Promise<Ingredient[]> => {
        if (cachedIngredients) return cachedIngredients

        try {
            const response = await axios.get<Ingredient[]>(
                `${API_BASE_URL}api/v1/ingredient/`
            )
            cachedIngredients = response.data
            return cachedIngredients
        } catch (error) {
            console.error('Error fetching ingredients:', error)
            throw error
        }
    },

    getCachedIngredients: (): Ingredient[] | null => {
        return cachedIngredients
    },
}
