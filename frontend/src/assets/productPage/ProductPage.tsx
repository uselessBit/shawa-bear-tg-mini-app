import { Drawer, Image, Heading, Flex } from '@chakra-ui/react'
import { Price } from '@/types/Products.ts'
import API_SHORT_URL from '@/config.ts'
import CostPicker from './components/CostPicker.tsx'
import IngredientCheckboxGroup from './components/IngredientCheckboxGroup.tsx'
import CustomNumberInput from './components/NumberInput.tsx'
import ToBasketButton from './components/ToBasketButton.tsx'
import { useState } from 'react'

type ProductPageProps = {
    price: Price
}

export default function ProductPage({ price }: ProductPageProps) {
    const [selectedPrice, setSelectedPrice] = useState<Price>(price)
    const [quantity, setQuantity] = useState(1)

    return (
        <>
            <Drawer.Header p="0" display="flex" flexDirection="column">
                <Image
                    src={`${API_SHORT_URL}media/products/${price.product.image_url}`}
                    transform="scaleX(-1)"
                    rounded="42px 42px 0 0"
                />
                <Heading
                    size="5xl"
                    fontWeight="800"
                    color="text"
                    textAlign="center"
                    mt="-32px"
                    pos="relative"
                >
                    {price.product.name}
                </Heading>
            </Drawer.Header>

            <Drawer.Body p="12px">
                <CostPicker price={price} setSelectedPrice={setSelectedPrice} />

                <IngredientCheckboxGroup
                    ingredients={price.product.ingredients}
                ></IngredientCheckboxGroup>
            </Drawer.Body>

            <Drawer.Footer p="12px">
                <Flex w="full" gap="12px">
                    <CustomNumberInput
                        setQuantity={setQuantity}
                    ></CustomNumberInput>

                    <ToBasketButton
                        currentPrice={selectedPrice.price * quantity}
                        priceId={selectedPrice.price_id}
                        quantity={quantity}
                    ></ToBasketButton>
                </Flex>
            </Drawer.Footer>
        </>
    )
}
