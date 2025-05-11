import { ChakraProvider, Alert } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { system } from './theme.ts'
import Header from './assets/header/Header.tsx'
import MainList from './assets/mainList/MainList.tsx'
import { useCategories } from '@/hooks/useCategories'

export default function App() {
    const { categories, error } = useCategories()
    const [activeCategory, setActiveCategory] = useState('')

    useEffect(() => {
        if (categories.length > 0) setActiveCategory(categories[0].name)
    }, [categories])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [activeCategory])

    if (error) {
        return (
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
        )
    }

    return (
        <ChakraProvider value={system}>
            <Header
                categories={categories.map((c) => c.name)}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <MainList
                categories={categories.map((c) => c.name)}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
        </ChakraProvider>
    )
}
