import {
    Drawer,
    Image,
    Heading,
    Flex,
    CloseButton,
    Float,
} from '@chakra-ui/react'
import { Price } from '@/types/Products'
import API_SHORT_URL from '@/config'
import CostPicker from './components/CostPicker'
import IngredientCheckboxGroup from './components/IngredientCheckboxGroup'
import CustomNumberInput from './components/CustomNumberInput'
import ToBasketButton from './components/ToBasketButton'
import { useState, useEffect, useCallback } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext'
import { useBasketContext } from '@/contexts/BasketContext'
import LimitDialog from './components/LimitDialog'
import ProductInfo from './components/ProductInfo.tsx'

type ProductPageProps = {
    price: Price
}

export default function ProductPage({ price }: ProductPageProps) {
    const [selectedPrice, setSelectedPrice] = useState<Price>(price)
    const [quantity, setQuantity] = useState(1)
    const [tempQuantity, setTempQuantity] = useState(1)
    const [quantityTimeout, setQuantityTimeout] = useState<NodeJS.Timeout>()
    const [excludedIngredientIds, setExcludedIngredientIds] = useState<
        number[]
    >([])

    const { onClose } = useDrawer()
    const { error, clearError } = useBasketContext()
    const [showLimitDialog, setShowLimitDialog] = useState(false)

    const debouncedSetQuantity = useCallback(
        (value: number) => {
            if (quantityTimeout) clearTimeout(quantityTimeout)
            const timeout = setTimeout(() => setQuantity(value), 500)
            setQuantityTimeout(timeout)
        },
        [quantityTimeout]
    )

    useEffect(() => {
        return () => {
            if (quantityTimeout) clearTimeout(quantityTimeout)
        }
    }, [quantityTimeout])

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
                    alt={price.product.name}
                />
                <Heading
                    size="5xl"
                    fontWeight="800"
                    color="text"
                    textAlign="center"
                    mt="-32px"
                    pos="relative"
                    w="full"
                >
                    {price.product.name}
                    <Float placement="middle-end" offsetX="8">
                        <ProductInfo price={selectedPrice} />
                    </Float>
                </Heading>
            </Drawer.Header>

            <Drawer.Body p="12px">
                <CostPicker price={price} setSelectedPrice={setSelectedPrice} />

                <IngredientCheckboxGroup
                    ingredients={price.product.ingredients}
                    onChange={(ids) => setExcludedIngredientIds(ids)}
                />
            </Drawer.Body>

            <Drawer.Footer p="12px">
                <Flex w="full" gap="12px">
                    <CustomNumberInput
                        defaultValue={tempQuantity.toString()}
                        setQuantity={(value) => {
                            setTempQuantity(value)
                            debouncedSetQuantity(value)
                        }}
                    />

                    <ToBasketButton
                        currentPrice={selectedPrice.price * quantity}
                        priceId={selectedPrice.price_id}
                        quantity={quantity}
                        excludedIngredientIds={excludedIngredientIds}
                    />
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
