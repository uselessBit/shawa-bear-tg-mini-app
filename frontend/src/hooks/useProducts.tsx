import { useState, useEffect } from 'react'
import { ProductService } from '@/api/ProductService'

export const useProducts = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [productsLoaded, setProductsLoaded] = useState(false)

    const loadProducts = async () => {
        try {
            await ProductService.fetchAllPrices()
            setProductsLoaded(true)
        } catch (err) {
            setError(
                `Ошибка загрузки: ${err instanceof Error ? err.message : err}`
            )
        } finally {
            setLoading(false)
        }
    }

    const refreshProducts = async () => {
        setLoading(true)
        await loadProducts()
    }

    useEffect(() => {
        if (!productsLoaded) {
            loadProducts()
        }
    }, [])

    return {
        loading,
        error,
        refreshProducts,
        getProductsByCategory: ProductService.getProductsByCategory,
    }
}
