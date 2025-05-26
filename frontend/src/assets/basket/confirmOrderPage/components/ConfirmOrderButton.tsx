import { Button } from '@chakra-ui/react'
import { useDrawer } from '@/contexts/DrawerContext.tsx'
import { useBasketContext } from '@/contexts/BasketContext.tsx'
import { useOrder } from '@/contexts/OrderContext'

export default function ConfirmOrderButton() {
    const { basket, refreshBasket } = useBasketContext()
    const { onClose } = useDrawer()
    const { submitOrder, isSuccess } = useOrder()

    const handleSubmit = async () => {
        if (!basket) return
        if (isSuccess) await submitOrder(basket)
        await refreshBasket()
        if (isSuccess) onClose()
    }

    return (
        <>
            <Button
                w="full"
                bg="accent"
                h="56px"
                p="0"
                fontSize="lg"
                fontWeight="700"
                rounded="full"
                color="text"
                onClick={handleSubmit}
            >
                Заказать - {basket?.total_price}р
            </Button>
        </>
    )
}
