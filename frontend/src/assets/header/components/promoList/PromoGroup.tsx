import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import PromoCard from './PromoCard.tsx'

type PromoButton = {
    image: string
    isViewed: boolean
}

export default function PromoGroup() {
    const [cards, setCards] = useState<PromoButton[]>([
        { image: './promo.webp', isViewed: false },
        { image: './promo.webp', isViewed: false },
        { image: './promo.webp', isViewed: false },
        { image: './promo.webp', isViewed: false },
        { image: './promo.webp', isViewed: false },
        { image: './promo.webp', isViewed: false },
    ])

    const toggleViewed = (index: number) => {
        setCards(
            cards.map((card, i) =>
                i === index ? { ...card, isViewed: true } : card
            )
        )
    }

    return (
        <Flex gap="8px" overflowY="auto" scrollbar="hidden" w="100%" px="gap">
            {cards.map((card, index) => (
                <PromoCard
                    key={index}
                    image={card.image}
                    isViewed={card.isViewed}
                    onClick={() => {
                        toggleViewed(index)
                    }}
                />
            ))}
        </Flex>
    )
}
