import { Button } from '@chakra-ui/react'
import { useDrawer } from '@/contexts/DrawerContext.tsx'
import { useBasketContext } from '@/contexts/BasketContext.tsx'
import { useOrder } from '@/contexts/OrderContext'
import { useEffect } from 'react'
import { toaster } from '@/components/ui/toaster.tsx'
import { useUserContext } from '@/contexts/UserContext.tsx'

export default function ConfirmOrderButton() {
    const { basket, refreshBasket } = useBasketContext()
    const { onClose } = useDrawer()
    const { formState, submitOrder, isSuccess, resetForm, setVirtualCoins } =
        useOrder()
    const { user } = useUserContext()

    useEffect(() => {
        if (isSuccess) {
            resetForm()
            onClose()

            if (user && setVirtualCoins) {
                setVirtualCoins(user.coins)
            }

            toaster.create({
                description: 'Заказ успешно оформлен!',
                type: 'success',
            })
        }
    }, [isSuccess, resetForm, onClose, user, setVirtualCoins])

    const handleSubmit = async () => {
        if (!basket) return
        await submitOrder(basket)
        await refreshBasket()
    }

    return (
        <Button
            w="full"
            bg="accent"
            h="48px"
            p="0"
            fontSize="md"
            fontWeight="700"
            rounded="full"
            color="text"
            onClick={handleSubmit}
        >
            Заказать -{' '}
            {basket
                ? (basket.total_price - formState.discount).toFixed(1)
                : '0'}
            р
        </Button>
    )
}
