import { Button, Icon } from '@chakra-ui/react'
import { IoBasket } from 'react-icons/io5'
import React from 'react'
import { useBasketContext } from '@/contexts/BasketContext'

type BasketButtonProps = {
    onClick?: React.MouseEventHandler
    openBasketPage: () => void
}

export default function BasketButton({
    onClick,
    openBasketPage,
}: BasketButtonProps) {
    const { basket, loading } = useBasketContext()

    if (loading || !basket || basket.total_price === 0) return null

    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        openBasketPage()
        onClick?.(event)
    }

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
            onClick={handleOnClick}
        >
            <Icon as={IoBasket} boxSize={8} />
            {basket?.total_price}p
        </Button>
    )
}
