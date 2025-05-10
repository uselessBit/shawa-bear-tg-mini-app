import { Flex } from '@chakra-ui/react'
import { useRef, useEffect } from 'react'
import CategoryButton from './CategoryButton.tsx'

type CategoriesGroupProps = {
    categories: string[]
    activeCategory: string
    setActiveCategory: (category: string) => void
}

export default function CategoriesGroup({
    categories,
    activeCategory,
    setActiveCategory,
}: CategoriesGroupProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

    // Скролл к активной кнопке
    useEffect(() => {
        const button = buttonRefs.current.get(activeCategory)
        const container = containerRef.current

        if (button && container) {
            const containerWidth = container.offsetWidth
            const buttonLeft = button.offsetLeft
            const buttonWidth = button.offsetWidth

            container.scrollTo({
                left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
                behavior: 'smooth',
            })
        }
    }, [activeCategory])

    const handleClick = (category: string) => {
        setActiveCategory(category)
        const element = document.getElementById(category)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <Flex
            ref={containerRef}
            bg="back/70"
            backdropFilter="blur(16px)"
            gap="8px"
            overflowX="auto"
            scrollbar="hidden"
            w="100%"
            px="gap"
            py="8px"
            my="8px"
        >
            {categories.map((category) => (
                <CategoryButton
                    key={category}
                    innerRef={(node) =>
                        node && buttonRefs.current.set(category, node)
                    }
                    text={category}
                    isActive={activeCategory === category}
                    onClick={() => handleClick(category)}
                />
            ))}
        </Flex>
    )
}
