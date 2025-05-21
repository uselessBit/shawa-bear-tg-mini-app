import { Button } from '@chakra-ui/react'

type ToBasketProps = {
    currentPrice: number
}

export default function ToBasketButton({ currentPrice }: ToBasketProps) {
    return (
        <Button
            flex="1"
            bg="accent"
            h="56px"
            p="0"
            fontSize="lg"
            fontWeight="700"
            rounded="full"
            color="text"
        >
            В корзину - {currentPrice}р
        </Button>
    )
}
