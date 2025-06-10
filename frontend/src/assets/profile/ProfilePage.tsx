import {
    Drawer,
    Heading,
    CloseButton,
    Icon,
    Center,
    Flex,
    Text,
    Spinner,
    Alert,
} from '@chakra-ui/react'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext'
import { RiUser3Line } from 'react-icons/ri'
import { useUserContext } from '@/contexts/UserContext'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function ProfilePage() {
    const { onClose } = useDrawer()
    const { user, orderHistory, loading, error } = useUserContext()

    const formatOrderDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return format(date, 'dd.MM.yyyy HH:mm', { locale: ru })
        } catch {
            return 'Дата неизвестна'
        }
    }

    const translateStatus = (status: string) => {
        const statusMap: Record<string, string> = {
            in_progress: 'В процессе',
            taken: 'Забран',
            pending: 'Ожидает',
            canceled: 'Отменен',
            delivered: 'Доставлен',
        }
        return statusMap[status] || status
    }

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    if (error) {
        return (
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
        )
    }

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
                    <Center w="100px" h="100px" bg="back" rounded="24px">
                        <Icon as={RiUser3Line} w="60%" h="60%" color="text" />
                    </Center>

                    <Flex direction="column" justify="space-between" py="8px">
                        <Heading size="xl" fontWeight="800">
                            {user?.first_name || 'Пользователь'}
                        </Heading>

                        <Heading size="lg" fontWeight="500">
                            {user?.phone || 'Телефон не указан'}
                        </Heading>

                        <Heading size="lg" fontWeight="500">
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
                    {orderHistory.length === 0 ? (
                        <Text textAlign="center" py={4}>
                            У вас пока нет заказов
                        </Text>
                    ) : (
                        orderHistory.map((order) => (
                            <Flex
                                key={order.order_id}
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
                                    px="16px"
                                    py="6px"
                                    w="fit"
                                    right="gap"
                                    pos="absolute"
                                >
                                    {translateStatus(order.status)}
                                </Center>

                                <Text fontWeight="500" color="text/50">
                                    {formatOrderDate(order.order_date)}
                                </Text>

                                <Text fontWeight="500">
                                    Заказ №{order.order_id}
                                </Text>

                                <Text fontWeight="500">
                                    {order.address || 'Адрес не указан'}
                                </Text>

                                <Flex direction="column">
                                    {order.items.map((item) => (
                                        <Flex
                                            key={item.order_item_id}
                                            direction="column"
                                        >
                                            <Text fontWeight="500">
                                                {item.quantity} ×{' '}
                                                {item.price_id}
                                            </Text>
                                            {item.excluded_ingredient_ids
                                                .length > 0 && (
                                                <Text
                                                    fontWeight="500"
                                                    color="text/50"
                                                >
                                                    Без:{' '}
                                                    {item.excluded_ingredient_ids.join(
                                                        ', '
                                                    )}
                                                </Text>
                                            )}
                                        </Flex>
                                    ))}
                                </Flex>

                                <Text fontWeight="500">
                                    Способ оплаты: {order.payment_option}
                                </Text>

                                <Text fontWeight="500">
                                    Итоговая сумма: {order.total_price}р
                                </Text>
                            </Flex>
                        ))
                    )}
                </Flex>
            </Drawer.Body>
        </>
    )
}
