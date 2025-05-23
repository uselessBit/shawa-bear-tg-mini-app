import { Drawer, Heading, Flex } from '@chakra-ui/react'
import ToConfirmOrder from './components/ToConfirmOrder'
import BasketCard from './components/BasketCard.tsx'
import { useBasketContext } from '@/contexts/BasketContext.tsx'

const getItemCountText = (count: number) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'товаров'
    }

    switch (lastDigit) {
        case 1:
            return 'товар'
        case 2:
        case 3:
        case 4:
            return 'товара'
        default:
            return 'товаров'
    }
}

export default function ProductPage() {
    const { basketPrices } = useBasketContext()
    const itemCount = basketPrices.reduce(
        (sum, price) => sum + (price.quantity || 0),
        0
    )
    const itemText = getItemCountText(itemCount)

    return (
        <>
            <Drawer.Header py="gap" display="flex" flexDirection="column">
                <Heading color="text" fontWeight="800" size="2xl">
                    {`Корзина - ${itemCount} ${itemText}`}
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
