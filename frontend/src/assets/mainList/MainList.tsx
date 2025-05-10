import { Flex } from '@chakra-ui/react'
import Card from './Card.tsx'
import CategoryTitle from './CategoryTitle.tsx'
import { useState, useEffect } from 'react'

type MainListProps = {
    categories: string[]
    activeCategory: string
    setActiveCategory: (category: string) => void
}

type Products = {
    title: string
    category: string
}

export default function MainList({
    categories,
    activeCategory,
    setActiveCategory,
}: MainListProps) {
    const [products, setProducts] = useState<Products[]>([
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Чикен',
            category: 'Донеры',
        },
        {
            title: 'Бургир',
            category: 'Бургеры',
        },
        {
            title: 'Бургир',
            category: 'Бургеры',
        },
        {
            title: 'Бургир',
            category: 'Бургеры',
        },
        {
            title: 'Клубника',
            category: 'Десерты',
        },
        {
            title: 'Клубника',
            category: 'Десерты',
        },
        {
            title: 'Клубника',
            category: 'Десерты',
        },
        {
            title: 'Кола',
            category: 'Напитки',
        },
    ])

    const [visibleCategories, setVisibleCategories] = useState<string[]>([])

    const handleVisibilityChange = (category: string, isVisible: boolean) => {
        setVisibleCategories((prev) => {
            const newList = isVisible
                ? [...prev.filter((c) => c !== category), category]
                : prev.filter((c) => c !== category)

            return newList
        })
    }

    const [isAutoChangeBlocked, setIsAutoChangeBlocked] = useState(false)

    useEffect(() => {
        setIsAutoChangeBlocked(true)
        const timeout = setTimeout(() => {
            setIsAutoChangeBlocked(false)
        }, 700)
        return () => clearTimeout(timeout)
    }, [activeCategory])

    useEffect(() => {
        if (isAutoChangeBlocked) return

        if (visibleCategories.length > 0) {
            setActiveCategory(visibleCategories[0])
        } else {
            setActiveCategory(categories[0])
        }
    }, [visibleCategories, isAutoChangeBlocked])

    return (
        <Flex px="gap" flexDirection="column" gap="gap">
            {categories.map((category) => (
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

                    {products
                        .filter((product) => product.category === category)
                        .map((product, index) => (
                            <Card
                                title={product.title}
                                key={`${product.title}-${index}`}
                            />
                        ))}
                </Flex>
            ))}
        </Flex>
    )
}
