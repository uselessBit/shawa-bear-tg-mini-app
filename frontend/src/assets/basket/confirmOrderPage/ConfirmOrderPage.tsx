import {
    Drawer,
    Heading,
    CloseButton,
    Icon,
    Flex,
    Textarea,
    Switch,
    Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoArrowBackOutline } from 'react-icons/io5'
import ConfirmOrderButton from './components/ConfirmOrderButton.tsx'
import CustomSelect from './components/CustomSelect.tsx'
import { Input } from '@chakra-ui/react'
import { withMask } from 'use-mask-input'
import { IoWallet, IoCard } from 'react-icons/io5'
import { useOrder } from '@/contexts/OrderContext'
import { HiCheck, HiX } from 'react-icons/hi'
import { useUserContext } from '@/contexts/UserContext.tsx'
import { useBasketContext } from '@/contexts/BasketContext.tsx'

const MotionHeader = motion(Drawer.Header)
const MotionBody = motion(Drawer.Body)
const MotionFooter = motion(Drawer.Footer)

export const ConfirmOrderPage = {
    Header: ({ onBack }: { onBack: () => void }) => (
        <MotionHeader
            position="relative"
            py="24px"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <CloseButton
                position="absolute"
                left="24px"
                top="20px"
                onClick={onBack}
            >
                <Icon as={IoArrowBackOutline} boxSize={6} />
            </CloseButton>
            <Heading size="2xl" fontWeight="800" textAlign="center" w="full">
                Оформление
            </Heading>
        </MotionHeader>
    ),

    Body: () => {
        const addressOptions = [
            { label: 'ул. Ленина 10', value: 'ул. Ленина 10' },
            { label: 'пр. Независимости 25', value: 'пр. Независимости 25' },
        ]
        const timeOptions = [10, 15, 20, 25, 30].map((m) => ({
            label: `${m} минут`,
            value: `${m}`,
        }))
        const paymentOptions = [
            { label: 'Картой', value: 'card', icon: <IoCard /> },
            { label: 'Наличными', value: 'cash', icon: <IoWallet /> },
        ]

        const { user } = useUserContext()
        const { basket } = useBasketContext()

        const {
            formState,
            errors,
            updateField,
            updateSelectField,
            setVirtualCoins,
        } = useOrder()

        return (
            <MotionBody
                px="12px"
                py="0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Flex direction="column" gap="12px" h="full">
                    <CustomSelect
                        options={addressOptions}
                        placeholder="Откуда заберёте заказ?"
                        value={[formState.address]}
                        setValue={(val) => updateSelectField('address', val)}
                        isInvalid={!!errors.address}
                    />
                    <Input
                        bg="back"
                        borderColor={errors.firstName ? 'red.500' : 'back'}
                        outline="none"
                        h="48px"
                        minH="48px"
                        px="24px"
                        rounded="full"
                        size="md"
                        fontWeight="500"
                        placeholder="Имя"
                        value={formState.firstName}
                        onChange={(e) =>
                            updateField('firstName', e.target.value)
                        }
                    />
                    <Input
                        bg="back"
                        borderColor={errors.phone ? 'red.500' : 'back'}
                        outline="none"
                        h="48px"
                        minH="48px"
                        rounded="full"
                        size="md"
                        fontWeight="500"
                        px="24px"
                        placeholder="+375 (99) 999-99-99"
                        ref={withMask('+375 (99) 999-99-99')}
                        value={formState.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                    />
                    <CustomSelect
                        options={timeOptions}
                        placeholder="Через сколько заберёте?"
                        value={[formState.timeTaken]}
                        setValue={(val) => updateSelectField('timeTaken', val)}
                        isInvalid={!!errors.timeTaken}
                    />
                    <CustomSelect
                        options={paymentOptions}
                        placeholder="Какой способ оплаты?"
                        value={[formState.paymentOption]}
                        setValue={(val) =>
                            updateSelectField('paymentOption', val)
                        }
                        isInvalid={!!errors.payment}
                    />

                    {user && basket && user.coins > 0 && (
                        <Flex
                            bg="back"
                            h="48px"
                            minH="48px"
                            rounded="full"
                            px="24px"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Text fontSize="14px" fontWeight="500">
                                {`Скидка ${Math.min(70, Math.floor((user.coins * 100) / basket.total_price))}% за баллы`}
                            </Text>

                            <Switch.Root
                                size="md"
                                scale="1.5"
                                checked={formState.useCoins}
                                onCheckedChange={(checked) => {
                                    updateField('useCoins', Boolean(checked))

                                    const maxDiscount = Math.floor(
                                        basket.total_price * 0.7
                                    )
                                    const discount = Math.min(
                                        user.coins,
                                        maxDiscount
                                    )

                                    updateField(
                                        'discount',
                                        checked ? discount : 0
                                    )

                                    if (checked) {
                                        setVirtualCoins(user.coins - discount)
                                    } else {
                                        setVirtualCoins(user.coins)
                                    }
                                }}
                            >
                                <Switch.HiddenInput />
                                <Switch.Control bg="card">
                                    <Switch.Thumb
                                        bg="back"
                                        boxShadow="none"
                                        _checked={{ bg: 'accent' }}
                                    >
                                        <Switch.ThumbIndicator
                                            fallback={<HiX color="text" />}
                                        >
                                            <HiCheck />
                                        </Switch.ThumbIndicator>
                                    </Switch.Thumb>
                                </Switch.Control>
                            </Switch.Root>
                        </Flex>
                    )}

                    <Textarea
                        bg="back"
                        borderWidth="0"
                        outline="none"
                        boxShadow="none"
                        flex="1"
                        rounded="28px"
                        size="md"
                        fontWeight="500"
                        px="24px"
                        py="12px"
                        minH="48px"
                        resize="none"
                        placeholder="Комментарий к заказу..."
                        value={formState.comment}
                        onChange={(e) => updateField('comment', e.target.value)}
                    />
                </Flex>
            </MotionBody>
        )
    },

    Footer: () => (
        <MotionFooter
            p="12px"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <ConfirmOrderButton />
        </MotionFooter>
    ),
}
