import { Text, Flex, Button, Image, Heading, Mark } from '@chakra-ui/react'

export default function Card() {
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
        >
            <Image src="/shava.png" h="full" />
            <Flex
                flexDirection="column"
                flex="2"
                height="full"
                py="12px"
                justifyContent="space-between"
            >
                <Heading
                    color="text"
                    lineClamp="1"
                    textAlign="left"
                    w="95%"
                    size="2xl"
                    fontWeight="600"
                    lineHeight="22px"
                >
                    Чикен
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
                >
                    стандартный лаваш, курица, помидор, огурец, салат, чесночный
                    соус, томатный соус
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
                    >
                        от 6.5<Mark color="accent">р</Mark>
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
