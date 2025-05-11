import { useState, useEffect } from 'react'
import { ProductService } from '@/api/ProductService'
import { Category } from '@/types/Products'

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await ProductService.fetchCategories()
                setCategories(data)
            } catch (err) {
                setError(
                    `Ошибка загрузки: ${err instanceof Error ? err.message : err}`
                )
            } finally {
                setLoading(false)
            }
        }

        loadCategories()
    }, [])

    return { categories, loading, error }
}
