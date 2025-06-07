import { Alert, Flex, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import CategoryTitle from './components/CategoryTitle'
import { useProducts } from '@/hooks/useProducts'
import Card from './components/Card'
import ProductPage from '@/assets/product/ProductPage'
import MotionDrawer from '@/assets/MotionDrawer'

type MainListProps = {
    categories: string[]
    activeCategory: string
    setActiveCategory: (category: string) => void
}

export default function MainList({
    categories,
    activeCategory,
    setActiveCategory,
}: MainListProps) {
    const { loading, error, getProductsByCategory } = useProducts()

    const [visibleCategories, setVisibleCategories] = useState<string[]>([])
    const [isAutoChangeBlocked, setIsAutoChangeBlocked] = useState(false)

    const handleVisibilityChange = (category: string, isVisible: boolean) => {
        setVisibleCategories((prev) =>
            isVisible
                ? [...prev.filter((c) => c !== category), category]
                : prev.filter((c) => c !== category)
        )
    }

    useEffect(() => {
        setIsAutoChangeBlocked(true)

        setTimeout(() => {
            setIsAutoChangeBlocked(false)
        }, 700)
    }, [activeCategory])

    useEffect(() => {
        if (isAutoChangeBlocked) return

        setActiveCategory(
            visibleCategories.length > 0 ? visibleCategories[0] : categories[0]
        )
    }, [visibleCategories, isAutoChangeBlocked])

    if (error) {
        return (
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
        )
    }

    return (
        <Flex px="gap" flexDirection="column" gap="gap" pb="gap">
            {loading ? (
                <>
                    <Skeleton h="32px" rounded="26px" />
                    {Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton key={i} h="140px" rounded="26px" />
                        ))}
                </>
            ) : (
                categories.map((category) => (
                    <Flex
                        id={category}
                        key={category}
                        direction="column"
                        gap="gap"
                        minH="500px"
                    >
                        <CategoryTitle
                            category={category}
                            onVisibilityChange={handleVisibilityChange}
                        />

                        {getProductsByCategory(category).map((price) => (
                            <MotionDrawer
                                key={`${price.product.product_id}-${price.size.size_id}`}
                                trigger={<Card price={price} />}
                            >
                                <ProductPage price={price} />
                            </MotionDrawer>
                        ))}
                    </Flex>
                ))
            )}
        </Flex>
    )
}
