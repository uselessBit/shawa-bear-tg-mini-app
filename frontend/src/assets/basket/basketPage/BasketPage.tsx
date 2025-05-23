import { Drawer, Heading, Flex } from '@chakra-ui/react'
import ToConfirmOrder from './components/ToConfirmOrder'
import BasketCard from './components/BasketCard.tsx'
import { useBasketContext } from '@/contexts/BasketContext.tsx'

export default function ProductPage() {
    const { basketPrices } = useBasketContext()
    return (
        <>
            <Drawer.Header py="gap" display="flex" flexDirection="column">
                <Heading color="text" fontWeight="800" size="2xl">
                    Корзина
                </Heading>
            </Drawer.Header>

            <Drawer.Body px="12px" py="0">
                <Flex direction="column" gap="gap">
                    {basketPrices.map((price) => (
                        <BasketCard key={price.price_id} price={price} />
                    ))}
                </Flex>
            </Drawer.Body>

            <Drawer.Footer p="12px">
                <ToConfirmOrder />
            </Drawer.Footer>
        </>
    )
}
