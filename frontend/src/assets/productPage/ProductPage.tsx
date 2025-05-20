import { Drawer, Image, Heading, Flex } from '@chakra-ui/react'
import { Price } from '@/types/Products.ts'
import API_SHORT_URL from '@/config.ts'
import CostPicker from './components/CostPicker.tsx'
import IngredientCheckboxGroup from './components/IngredientCheckboxGroup.tsx'
import CustomNumberInput from './components/NumberInput.tsx'
import ToBasketButton from './components/ToBasketButton.tsx'

type ProductPageProps = {
    price: Price
}

export default function ProductPage({ price }: ProductPageProps) {
    return (
        <>
            <Drawer.Header p="0" display="flex" flexDirection="column">
                <Image
                    src={`${API_SHORT_URL}media/products/${price.product.image_url}`}
                    transform="scaleX(-1)"
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
                <CostPicker price={price} />

                <IngredientCheckboxGroup
                    ingredients={price.product.ingredients}
                ></IngredientCheckboxGroup>
            </Drawer.Body>

            <Drawer.Footer p="12px">
                <Flex w="full" gap="12px">
                    <CustomNumberInput></CustomNumberInput>
                    <ToBasketButton></ToBasketButton>
                </Flex>
            </Drawer.Footer>
        </>
    )
}
