import { CloseButton } from '@chakra-ui/react'
import { useDrawer } from '@/contexts/DrawerContext'
import { useBasketContext } from '@/contexts/BasketContext'

type ToBasketProps = {
    currentPrice: number
    priceId: number
    quantity: number
}

export default function ToBasketButton({
    currentPrice,
    priceId,
    quantity,
}: ToBasketProps) {
    const { onClose } = useDrawer()
    const { addToBasket } = useBasketContext()

    const handleClick = async () => {
        const success: boolean = await addToBasket(priceId, quantity)
        if (success) {
            onClose()
        }
    }

    return (
        <CloseButton
            flex="1"
            bg="accent"
            h="56px"
            p="0"
            fontSize="lg"
            fontWeight="700"
            rounded="full"
            color="text"
            onClick={handleClick}
        >
            В корзину - {currentPrice}р
        </CloseButton>
    )
}
