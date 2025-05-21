import { Button, Icon } from '@chakra-ui/react'
import { IoBasket } from 'react-icons/io5'
import React from 'react'

type BasketButtonProps = {
    onClick?: React.MouseEventHandler
}

export default function BasketButton({ onClick }: BasketButtonProps) {
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
            6.5p
        </Button>
    )
}
