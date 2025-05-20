import { Button } from '@chakra-ui/react'

export default function ToBasketButton() {
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
            В корзину - 6.5р
        </Button>
    )
}
