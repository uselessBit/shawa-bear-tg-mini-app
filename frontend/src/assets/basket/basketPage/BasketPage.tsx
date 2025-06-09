import { Drawer, Heading, Flex, CloseButton, Float } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ToConfirmOrder from './components/ToConfirmOrder'
import BasketCard from './components/BasketCard'
import { useBasketContext } from '@/contexts/BasketContext'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext.tsx'

const MotionHeader = motion(Drawer.Header)
const MotionBody = motion(Drawer.Body)
const MotionFooter = motion(Drawer.Footer)

const getItemCountText = (count: number) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров'
    switch (lastDigit) {
        case 1:
            return 'товар'
        case 2:
        case 3:
        case 4:
            return 'товара'
        default:
            return 'товаров'
    }
}

export const BasketPage = {
    Header: () => {
        const { basketPrices } = useBasketContext()
        const itemCount = basketPrices.reduce(
            (sum, price) => sum + (price.quantity || 0),
            0
        )
        const { onClose } = useDrawer()

        return (
            <MotionHeader
                py="24px"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
            >
                <CloseButton
                    position="absolute"
                    left="20px"
                    top="20px"
                    w="fit"
                    onClick={onClose}
                    zIndex="10"
                >
                    <IoClose />
                </CloseButton>

                <Heading
                    size="2xl"
                    fontWeight="800"
                    textAlign="center"
                    w="full"
                    position="relative"
                >
                    Корзина
                    <Float
                        placement="middle-end"
                        opacity="0.5"
                        fontWeight="500"
                        fontSize="xs"
                        offsetX="6"
                    >
                        {itemCount} {getItemCountText(itemCount)}
                    </Float>
                </Heading>
            </MotionHeader>
        )
    },

    Body: () => {
        const { basketPrices } = useBasketContext()

        return (
            <MotionBody
                px="12px"
                py="0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Flex direction="column" gap="gap">
                    {basketPrices.map((price) => (
                        <BasketCard
                            key={`${price.price_id} + ${price.excluded_ingredient_names}`}
                            price={price}
                        />
                    ))}
                </Flex>
            </MotionBody>
        )
    },

    Footer: ({ openConfirm }: { openConfirm: () => void }) => (
        <MotionFooter
            p="12px"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <ToConfirmOrder openConfirmPage={openConfirm} />
        </MotionFooter>
    ),
}
