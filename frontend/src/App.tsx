import { ChakraProvider, Alert, Spinner, Center } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { system } from './theme.ts'
import Header from '@/assets/header/Header.tsx'
import MainList from '@/assets/mainList/MainList.tsx'
import { useCategories } from '@/hooks/useCategories'
import BasketButton from '@/assets/basket/BasketButton.tsx'
import MotionDrawer from '@/assets/MotionDrawer.tsx'
import { BasketDrawerContent } from '@/assets/basket/BasketDrawer.tsx'
import { BasketProvider } from '@/contexts/BasketContext.tsx'
import { OrderProvider } from '@/contexts/OrderContext'
import { Toaster } from '@/components/ui/toaster'
import { ShawarmaConstructorContent } from '@/assets/shawarmaConstructor/ShawarmaConstructorDrawer.tsx'
import { ConstructorProvider } from '@/contexts/ConstructorContext'
import ConstructorButton from '@/assets/shawarmaConstructor/ConstructorButton.tsx'
import { UserProvider } from '@/contexts/UserContext.tsx'

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string
                initDataUnsafe: {
                    user: { id: number; first_name: string; username?: string }
                }
                ready: () => void
            }
        }
    }
}

export default function App() {
    const { categories, error } = useCategories()
    const [activeCategory, setActiveCategory] = useState('')
    const [confirmActive, setConfirmActive] = useState<boolean>(false)
    const [userId, setUserId] = useState<number | null>(null)

    useEffect(() => {
        if (categories.length > 0) setActiveCategory(categories[0].name)
    }, [categories])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready()

            const uid = window.Telegram.WebApp.initDataUnsafe.user.id
            setUserId(uid)
        }
    }, [])

    if (error) {
        return (
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
        )
    }

    if (userId === null) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    return (
        <UserProvider userId={userId}>
            <OrderProvider userId={userId}>
                <BasketProvider userId={userId}>
                    <ConstructorProvider>
                        <ChakraProvider value={system}>
                            <Header
                                categories={categories.map((c) => c.name)}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />

                            <MotionDrawer trigger={<ConstructorButton />}>
                                <ShawarmaConstructorContent />
                            </MotionDrawer>

                            <MainList
                                categories={categories.map((c) => c.name)}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />

                            <MotionDrawer
                                trigger={
                                    <BasketButton
                                        openBasketPage={() =>
                                            setConfirmActive(false)
                                        }
                                    />
                                }
                            >
                                <BasketDrawerContent
                                    confirmActive={confirmActive}
                                    handleBack={() => setConfirmActive(false)}
                                    handleConfirm={() => setConfirmActive(true)}
                                />
                            </MotionDrawer>

                            <Toaster />
                        </ChakraProvider>
                    </ConstructorProvider>
                </BasketProvider>
            </OrderProvider>
        </UserProvider>
    )
}
