import {
    Drawer,
    Heading,
    CloseButton,
    Icon,
    Center,
    Flex,
    Text,
} from '@chakra-ui/react'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext'
import { RiUser3Line } from 'react-icons/ri'

export default function ProfilePage() {
    const { onClose } = useDrawer()

    return (
        <>
            <Drawer.Header position="relative">
                <CloseButton
                    position="absolute"
                    left="20px"
                    top="20px"
                    w="fit"
                    zIndex="docked"
                    onClick={onClose}
                >
                    <IoClose />
                </CloseButton>

                <Heading
                    size="2xl"
                    fontWeight="800"
                    textAlign="center"
                    w="full"
                >
                    Профиль
                </Heading>
            </Drawer.Header>

            <Drawer.Body p="12px">
                <Flex gap="gap">
                    <Center w="120px" h="120px" bg="back" rounded="24px">
                        <Icon w="60%" h="60%" color="text">
                            <RiUser3Line />
                        </Icon>
                    </Center>

                    <Flex direction="column" justify="space-between" py="8px">
                        <Heading size="2xl" fontWeight="800">
                            alexander
                        </Heading>

                        <Heading size="xl" fontWeight="500">
                            +375 (12) 345-67-89
                        </Heading>

                        <Heading size="xl" fontWeight="500">
                            Баллов: 0
                        </Heading>
                    </Flex>
                </Flex>

                <Heading
                    size="2xl"
                    fontWeight="800"
                    textAlign="center"
                    w="full"
                    py="gap"
                >
                    История заказов
                </Heading>

                <Flex gap="gap" direction="column">
                    <Flex
                        direction="column"
                        gap="12px"
                        p="gap"
                        borderWidth="2px"
                        borderColor="gray"
                        w="full"
                        rounded="32px"
                        pos="relative"
                    >
                        <Center
                            bg="accent"
                            fontWeight="600"
                            rounded="full"
                            px="24px"
                            py="8px"
                            w="fit"
                            right="gap"
                            pos="absolute"
                        >
                            забран
                        </Center>

                        <Text fontWeight="500" color="text/50">
                            27.11.2025 13:45
                        </Text>

                        <Text fontWeight="500">Заказ №13</Text>

                        <Text fontWeight="500">Минск, Крутая улица 13а</Text>

                        <Flex direction="column">
                            <Text fontWeight="500">
                                1. Шаурма "Чикен" - 400г
                            </Text>

                            <Text fontWeight="500" color="text/50">
                                Без: помидор
                            </Text>

                            <Text fontWeight="500">8.5р х 1 шт.</Text>
                        </Flex>

                        <Text fontWeight="500">Способ оплаты: картой</Text>

                        <Text fontWeight="500">Итоговая сумма: 8.5р</Text>
                    </Flex>
                </Flex>
            </Drawer.Body>
        </>
    )
}
