import { Button } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { RiUser3Line } from 'react-icons/ri'

export default function ProfileButton() {
    return (
        <Button bg="gray" rounded="full" h="hb" w="hb" minW="hb" p="0">
            <Icon size="md" color="text">
                <RiUser3Line />
            </Icon>
        </Button>
    )
}
