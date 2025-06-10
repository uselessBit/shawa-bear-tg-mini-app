import {
    Drawer,
    Heading,
    CloseButton,
    Icon,
    Center,
    Flex,
    Text,
    Spinner,
} from '@chakra-ui/react'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext'
import { RiUser3Line } from 'react-icons/ri'
import { useUserContext } from '@/contexts/UserContext'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ProductService } from '@/api/ProductService'
import { useEffect, useMemo, useState } from 'react'
import { Price } from '@/types/Products.ts'

export default function ProfilePage() {
    const { onClose } = useDrawer()
    const { user, orderHistory, loading } = useUserContext()
    const [prices, setPrices] = useState<Price[]>([])
    const [pricesLoading, setPricesLoading] = useState(true)

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
            created: 'Создан',
            canceled: 'Отменен',
            completed: 'Готов',
        }
        return statusMap[status] || status
    }

    const translatePayment = (payment: string) => {
        const paymentMap: Record<string, string> = {
            cash: 'Наличными',
            card: 'Картой',
        }
        return paymentMap[payment] || payment
    }

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const pricesData = await ProductService.fetchAllPrices()
                setPrices(pricesData)
                setPricesLoading(false)
            } catch (err) {
                console.error('Failed to load prices:', err)
                setPricesLoading(false)
            }
        }

        fetchPrices()
    }, [])

    const priceMap = useMemo(() => {
        const map = new Map<number, Price>()
        prices.forEach((price) => {
            map.set(price.price_id, price)
        })
        return map
    }, [prices])

    const isLoading = loading || pricesLoading

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
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
                            {`@${user?.username}` || 'Юзернейм скрыт'}
                        </Heading>

                        <Heading size="lg" fontWeight="500">
                            Баллов: {user?.coins}
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

                {orderHistory && (
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
                                        {order.items.map((item) => {
                                            const priceInfo = priceMap.get(
                                                item.price_id
                                            )
                                            return (
                                                <Flex
                                                    key={item.order_item_id}
                                                    direction="column"
                                                >
                                                    <Text fontWeight="500">
                                                        {item.quantity} ×{' '}
                                                        {priceInfo
                                                            ? `${priceInfo.product.name} (${priceInfo.size.name})`
                                                            : `Товар #${item.price_id}`}
                                                    </Text>
                                                </Flex>
                                            )
                                        })}
                                    </Flex>

                                    <Text fontWeight="500">
                                        Способ оплаты:{' '}
                                        {translatePayment(order.payment_option)}
                                    </Text>

                                    <Text fontWeight="500">
                                        Итоговая сумма: {order.total_price}р
                                    </Text>
                                </Flex>
                            ))
                        )}
                    </Flex>
                )}
            </Drawer.Body>
        </>
    )
}
