import { Text, Flex, Button, Image, Heading } from '@chakra-ui/react'
import React from 'react'

type ConstructorButtonProps = {
    onClick?: React.MouseEventHandler
}

export default function ConstructorButton({ onClick }: ConstructorButtonProps) {
    return (
        <Button
            borderWidth="1px"
            borderColor="gray"
            rounded="26px"
            overflow="hidden"
            bg="back"
            w="calc(100vw - 32px)"
            h="140px"
            justifyContent="space-between"
            p="0"
            gap="0"
            zIndex="0"
            mx="gap"
            mb="gap"
            onClick={onClick}
        >
            <Flex
                flexDirection="column"
                flex="2"
                height="full"
                px="16px"
                py="12px"
                justifyContent="space-between"
            >
                <Heading
                    color="text"
                    lineClamp="2"
                    lineHeight="28px"
                    textAlign="left"
                    w="200px"
                    size="2xl"
                    fontWeight="700"
                >
                    Конструктор шаурмы
                </Heading>

                <Text
                    color="text"
                    fontWeight="400"
                    opacity="50%"
                    textAlign="left"
                    w="180px"
                    fontSize="xs"
                    lineHeight="14px"
                    mb="4px"
                    lineClamp="3"
                >
                    Воспользуйтесь конструктором и соберите свою уникальную
                    шаурму
                </Text>
            </Flex>
            <Image src="constructor.png" h="full" scale="1.8" rotate="30deg" />
        </Button>
    )
}
