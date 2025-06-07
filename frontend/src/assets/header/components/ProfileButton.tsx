import { Button } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { RiUser3Line } from 'react-icons/ri'
import React from 'react'

type BasketButtonProps = {
    onClick?: React.MouseEventHandler
}

export default function ProfileButton({ onClick }: BasketButtonProps) {
    return (
        <Button
            bg="gray"
            rounded="full"
            h="hb"
            w="hb"
            minW="hb"
            p="0"
            onClick={onClick}
        >
            <Icon size="md" color="text">
                <RiUser3Line />
            </Icon>
        </Button>
    )
}
