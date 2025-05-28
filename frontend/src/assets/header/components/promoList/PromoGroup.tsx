import { Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import PromoDialog from './PromoDialog'

type PromoButton = {
    image: string
    isViewed: boolean
}

const STORAGE_KEY = 'promoCardsViewed'

export default function PromoGroup() {
    const [cards, setCards] = useState<PromoButton[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved
            ? JSON.parse(saved)
            : [
                  { image: './promo.webp', isViewed: false },
                  { image: './promo.webp', isViewed: false },
                  { image: './promo.webp', isViewed: false },
                  { image: './promo.webp', isViewed: false },
                  { image: './promo.webp', isViewed: false },
                  { image: './promo.webp', isViewed: false },
              ]
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
    }, [cards])

    const toggleViewed = (index: number) => {
        setCards((prevCards) =>
            prevCards.map((card, i) =>
                i === index ? { ...card, isViewed: true } : card
            )
        )
    }

    return (
        <Flex gap="8px" overflowY="auto" scrollbar="hidden" w="100%" px="gap">
            {cards.map((card, index) => (
                <PromoDialog
                    key={index}
                    image={card.image}
                    isViewed={card.isViewed}
                    onClick={() => toggleViewed(index)}
                />
            ))}
        </Flex>
    )
}
