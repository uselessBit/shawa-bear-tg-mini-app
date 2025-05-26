import { Button } from '@chakra-ui/react'
import { useBasketContext } from '@/contexts/BasketContext'

type ToConfirmOrderProps = {
    openConfirmPage: () => void
}

export default function ToConfirmOrder({
    openConfirmPage,
}: ToConfirmOrderProps) {
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
            onClick={() => {
                openConfirmPage()
            }}
        >
            Оформить - {basket?.total_price}р
        </Button>
    )
}
