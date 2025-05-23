import { ChakraProvider, Alert } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { system } from './theme.ts'
import Header from '@/assets/header/Header.tsx'
import MainList from '@/assets/mainList/MainList.tsx'
import { useCategories } from '@/hooks/useCategories'
import BasketButton from '@/assets/basket/BasketButton.tsx'
import MotionDrawer from '@/assets/MotionDrawer.tsx'
import { BasketDrawerContent } from '@/assets/basket/BasketDrawer.tsx'
import { BasketProvider } from '@/contexts/BasketContext.tsx'

export default function App() {
    const { categories, error } = useCategories()
    const [activeCategory, setActiveCategory] = useState('')
    const [confirmActive, setConfirmActive] = useState<boolean>(false)

    useEffect(() => {
        if (categories.length > 0) setActiveCategory(categories[0].name)
    }, [categories])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (error) {
        return (
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
        )
    }

    return (
        <BasketProvider userId={0}>
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

                <MotionDrawer
                    trigger={
                        <BasketButton
                            openBasketPage={() => setConfirmActive(false)}
                        />
                    }
                >
                    <BasketDrawerContent
                        confirmActive={confirmActive}
                        handleBack={() => setConfirmActive(false)}
                        handleConfirm={() => setConfirmActive(true)}
                    />
                </MotionDrawer>
            </ChakraProvider>
        </BasketProvider>
    )
}
