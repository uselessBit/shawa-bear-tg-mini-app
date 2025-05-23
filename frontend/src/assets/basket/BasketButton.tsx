import { Button, Icon } from '@chakra-ui/react'
import { IoBasket } from 'react-icons/io5'
import React from 'react'
import { useBasketContext } from '@/contexts/BasketContext'

type BasketButtonProps = {
    onClick?: React.MouseEventHandler
}

export default function BasketButton({ onClick }: BasketButtonProps) {
    const { basket } = useBasketContext()

    return (
        <Button
            position="fixed"
            bottom="gap"
            right="gap"
            rounded="full"
            bg="accent"
            color="text"
            p="24px"
            fontSize="xl"
            fontWeight="700"
            onClick={onClick}
        >
            <Icon as={IoBasket} boxSize={8} />
            {basket?.total_price}p
        </Button>
    )
}
