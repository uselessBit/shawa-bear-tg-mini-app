import { Text, Flex, Image, Heading, Mark } from '@chakra-ui/react'
import API_SHORT_URL from '@/config.ts'
import { useState, useEffect } from 'react'
import { useBasketContext, PriceWithQuantity } from '@/contexts/BasketContext'
import CustomNumberInput from '@/assets/productPage/components/CustomNumberInput'

type CardProps = {
    price: PriceWithQuantity
}

export default function BasketCard({ price }: CardProps) {
    const { updateQuantity } = useBasketContext()
    const [localQuantity, setLocalQuantity] = useState(price.quantity)
    const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(
        null
    )

    useEffect(() => {
        setLocalQuantity(price.quantity)
    }, [price.quantity])

    const handleQuantityChange = (newQuantity: number) => {
        setLocalQuantity(newQuantity)

        if (updateTimeout) clearTimeout(updateTimeout)

        const newTimeout = setTimeout(async () => {
            try {
                await updateQuantity(price.basket_item_id, newQuantity)
            } catch (error) {
                setLocalQuantity(price.quantity)
            }
        }, 500)

        setUpdateTimeout(newTimeout)
    }

    return (
        <Flex
            rounded="26px"
            overflow="hidden"
            bg="card"
            w="full"
            h="140px"
            justifyContent="space-between"
            p="0"
            gap="0"
        >
            <Image
                src={`${API_SHORT_URL}media/products/${price.product.image_url}`}
                h="full"
                minW="152px"
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
                    mb="24px"
                >
                    {price.size.grams}г
                </Text>

                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="full"
                    h="fit"
                >
                    <Flex
                        h="40px"
                        bg="back"
                        color="text"
                        alignItems="center"
                        justifyContent="center"
                        px="30px"
                        rounded="full"
                        fontSize="md"
                        fontWeight="500"
                    >
                        {price.price}
                        <Mark color="accent">р</Mark>
                    </Flex>

                    <CustomNumberInput
                        small={true}
                        defaultValue={localQuantity.toString()}
                        setQuantity={handleQuantityChange}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}
