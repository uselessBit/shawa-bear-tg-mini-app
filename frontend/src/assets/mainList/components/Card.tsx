import React from 'react'
import { Text, Flex, Button, Image, Heading, Mark } from '@chakra-ui/react'
import { Price } from '@/types/Products.ts'

type CardProps = {
    price: Price
    onClick?: React.MouseEventHandler
}

export default function Card({ price, onClick }: CardProps) {
    return (
        <Button
            borderWidth="1px"
            borderColor="gray"
            rounded="26px"
            overflow="hidden"
            bg="back"
            w="full"
            h="140px"
            justifyContent="space-between"
            p="0"
            gap="0"
            zIndex="0"
            onClick={onClick}
        >
            <Image
                src={`products/${price.product.name}.png`}
                h="full"
                minW="132px"
            />
            <Flex
                flexDirection="column"
                flex="2"
                height="full"
                pb="12px"
                pt="6px"
                justifyContent="space-between"
            >
                <Heading
                    color="text"
                    lineClamp="1"
                    textAlign="left"
                    w="95%"
                    size="2xl"
                    fontWeight="700"
                >
                    {price.product.name}
                </Heading>

                <Text
                    color="text"
                    fontWeight="400"
                    opacity="50%"
                    lineClamp="3"
                    textAlign="left"
                    w="95%"
                    lineHeight="15px"
                    fontSize="xs"
                    mb="4px"
                >
                    {price.product.ingredients.map((i) => i.name).join(', ')}
                </Text>

                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="calc(100% - 12px)"
                >
                    <Flex
                        h="hb"
                        bg="gray"
                        color="text"
                        alignItems="center"
                        justifyContent="center"
                        px="20px"
                        rounded="full"
                        fontSize="xs"
                        fontWeight="500"
                    >
                        от {price.price}
                        <Mark color="accent">р</Mark>
                    </Flex>

                    <Flex
                        h="hb"
                        bg="accent"
                        color="text"
                        alignItems="center"
                        justifyContent="center"
                        px="20px"
                        rounded="full"
                        fontWeight="600"
                        fontSize="xl"
                    >
                        +
                    </Flex>
                </Flex>
            </Flex>
        </Button>
    )
}
