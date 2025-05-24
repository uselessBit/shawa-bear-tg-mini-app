import { Drawer, Image, Heading, Flex, CloseButton } from '@chakra-ui/react'
import { Price } from '@/types/Products.ts'
import API_SHORT_URL from '@/config.ts'
import CostPicker from './components/CostPicker.tsx'
import IngredientCheckboxGroup from './components/IngredientCheckboxGroup.tsx'
import CustomNumberInput from './components/CustomNumberInput.tsx'
import ToBasketButton from './components/ToBasketButton.tsx'
import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext.tsx'
import { useBasketContext } from '@/contexts/BasketContext.tsx'
import LimitDialog from './components/LimitDialog.tsx'

type ProductPageProps = {
    price: Price
}

export default function ProductPage({ price }: ProductPageProps) {
    const [selectedPrice, setSelectedPrice] = useState<Price>(price)
    const [quantity, setQuantity] = useState(1)

    const { onClose } = useDrawer()

    const { error, clearError } = useBasketContext()
    const [showLimitDialog, setShowLimitDialog] = useState(false)

    useEffect(() => {
        if (error?.includes('Максимальное')) {
            setShowLimitDialog(true)
        }
    }, [error])

    const handleCloseDialog = () => {
        setShowLimitDialog(false)
        clearError()
    }

    return (
        <>
            <Drawer.Header
                p="0"
                display="flex"
                flexDirection="column"
                position="relative"
            >
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

                <Image
                    src={`${API_SHORT_URL}media/products/${price.product.image_url}`}
                    transform="scaleX(-1)"
                    rounded="42px 42px 0 0"
                    zIndex="base"
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

            <LimitDialog
                isOpen={showLimitDialog}
                onClose={handleCloseDialog}
                title="Превышен лимит"
                message="В корзине может быть не более 99 единиц одного товара"
            />
        </>
    )
}
