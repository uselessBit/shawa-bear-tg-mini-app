import { Text, Flex, Image, Heading, Mark, Center } from '@chakra-ui/react'
import API_BASE_URL from '@/config.ts'
import { useState, useEffect } from 'react'
import { useBasketContext, PriceWithQuantity } from '@/contexts/BasketContext'
import CustomNumberInput from '@/assets/product/components/CustomNumberInput'
import DeleteProductButton from './DeleteProductButton.tsx'
import ConfirmationDialog from './ConfirmationDialog'
import { useDrawer } from '@/contexts/DrawerContext.tsx'

type CardProps = {
    price: PriceWithQuantity
}

export default function BasketCard({ price }: CardProps) {
    const { basket, updateQuantity, removeFromBasket } = useBasketContext()
    const { onClose } = useDrawer()
    const [localQuantity, setLocalQuantity] = useState(price.quantity)
    const [updateTimeout, setUpdateTimeout] = useState<number | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    useEffect(() => {
        setLocalQuantity(price.quantity)
    }, [price.quantity])

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false)
    }

    const handleQuantityChange = (newQuantity: number) => {
        setLocalQuantity(newQuantity)
        if (updateTimeout) clearTimeout(updateTimeout)
        const newTimeout = setTimeout(async () => {
            try {
                await updateQuantity(price.basket_item_id, newQuantity)
            } catch (error) {
                setLocalQuantity(price.quantity)
                console.error(error)
            }
        }, 500)
        setUpdateTimeout(newTimeout)
    }

    const handleDeleteConfirm = async () => {
        await removeFromBasket(price.basket_item_id)
        if (basket?.items.length === 1) onClose()
    }

    return (
        <>
            <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Удаление товара"
                message={
                    <>
                        Вы уверены, что хотите удалить
                        <br />"{price.product.name} - {price.size.grams}г" из
                        корзины?
                    </>
                }
            />

            <Flex
                rounded="26px"
                overflow="hidden"
                bg="card"
                w="full"
                h="110px"
                justifyContent="space-between"
                p="0"
                gap="0"
            >
                <Image
                    src={`${API_BASE_URL}media/products/${price.product.image_url}`}
                    h="full"
                    minW="121px"
                />
                <Flex
                    flexDirection="column"
                    flex="2"
                    height="calc(full - 12px)"
                    py="6px"
                    justifyContent="space-between"
                    position="relative"
                >
                    <DeleteProductButton onDelete={handleDeleteClick} />
                    <Flex alignItems="flex-end" gap="8px">
                        <Heading color="text" size="2xl" fontWeight="700">
                            {price.product.name}
                        </Heading>
                        <Text
                            color="text"
                            fontWeight="400"
                            opacity="50%"
                            fontSize="xs"
                            h="22px"
                        >
                            {`${price.size.grams}г`}
                        </Text>
                    </Flex>

                    <Text
                        color="text"
                        fontWeight="400"
                        opacity="50%"
                        lineClamp="3"
                        textAlign="left"
                        w="80%"
                        lineHeight="15px"
                        fontSize="xs"
                        minH="30px"
                        mb="4px"
                    >
                        {price.excluded_ingredient_names[0] &&
                            `Без: ${price.excluded_ingredient_names.join(', ')}`}
                    </Text>

                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="full"
                        h="fit"
                    >
                        <Center
                            h="32px"
                            bg="back"
                            color="text"
                            px="20px"
                            rounded="full"
                            fontSize="xs"
                            fontWeight="500"
                        >
                            {price.price}
                            <Mark color="accent">р</Mark>
                        </Center>

                        <CustomNumberInput
                            small={true}
                            defaultValue={localQuantity.toString()}
                            setQuantity={handleQuantityChange}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
