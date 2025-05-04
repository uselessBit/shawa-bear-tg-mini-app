import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import CategoryButton from './CategoryButton.tsx'

type CategoryButton = {
    text: string
    isActive: boolean
}

export default function CategoriesGroup() {
    const [buttons, setButtons] = useState<CategoryButton[]>([
        { text: 'Донеры', isActive: true },
        { text: 'Бургеры', isActive: false },
        { text: 'Десерты', isActive: false },
        { text: 'Напитки', isActive: false },
    ])

    const toggleActive = (index: number) => {
        setButtons(
            buttons.map((button, i) => ({
                ...button,
                isActive: i === index,
            }))
        )
    }

    return (
        <Flex
            bg="back"
            gap="8px"
            overflowY="auto"
            scrollbar="hidden"
            w="100%"
            p="gap"
        >
            {buttons.map((button, index) => (
                <CategoryButton
                    key={button.text}
                    text={button.text}
                    isActive={button.isActive}
                    onClick={() => toggleActive(index)}
                />
            ))}
        </Flex>
    )
}
