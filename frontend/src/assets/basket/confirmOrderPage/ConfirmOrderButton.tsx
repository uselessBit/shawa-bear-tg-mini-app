import { Button } from '@chakra-ui/react'
import { useDrawer } from '@/contexts/DrawerContext'
import { useBasketContext } from '@/contexts/BasketContext'

export default function ConfirmOrderButton() {
    const { basket } = useBasketContext()
    const { onClose } = useDrawer()

    return (
        <Button
            w="full"
            bg="accent"
            h="56px"
            p="0"
            fontSize="lg"
            fontWeight="700"
            rounded="full"
            color="text"
            onClick={() => {
                onClose()
            }}
        >
            Заказать - {basket?.total_price}р
        </Button>
    )
}
