import { Button } from '@chakra-ui/react'
import { useBasketContext } from '@/contexts/BasketContext.tsx'

export default function ToConfirmOrder() {
    const { basket } = useBasketContext()

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
        >
            Оформить - {basket?.total_price}р
        </Button>
    )
}
