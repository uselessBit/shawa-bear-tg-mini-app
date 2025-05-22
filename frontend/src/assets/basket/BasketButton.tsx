import { Button, Icon } from '@chakra-ui/react'
import { IoBasket } from 'react-icons/io5'
import React from 'react'

type BasketButtonProps = {
    onClick?: React.MouseEventHandler
    total: number
}

export default function BasketButton({ onClick, total }: BasketButtonProps) {
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
            {total}p
        </Button>
    )
}
