import { Flex, Heading } from '@chakra-ui/react'
import Card from './Card.tsx'

export default function MainList() {
    const categories = ['Донеры', 'Бургеры', 'Десерты', 'Напитки']

    return (
        <Flex px="gap" pb="gap" flexDirection="column" gap="gap">
            <Heading size="2xl" fontWeight="800" color="text">
                Донеры
            </Heading>

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </Flex>
    )
}
