import { Mark, Text, Heading, SegmentGroup, Skeleton } from '@chakra-ui/react'
import { Price } from '@/types/Products'
import { ProductService } from '@/api/ProductService'

type CostPickerProps = {
    price: Price
    setSelectedPrice: (price: Price) => void
}

export default function CostPicker({
    price,
    setSelectedPrice,
}: CostPickerProps) {
    const prices = ProductService.getAllPricesForProduct(
        price.product.product_id
    )

    if (!prices) return <Skeleton rounded="32px" h="124px" w="full" />

    return (
        <SegmentGroup.Root
            defaultValue="0"
            onValueChange={(e) => setSelectedPrice(prices[Number(e.value)])}
            bg="back"
            p="12px"
            rounded="32px"
            gap="12px"
            w="full"
        >
            <SegmentGroup.Indicator rounded="20px" boxShadow="none" bg="gray" />
            {prices.map((priceItem, index) => (
                <SegmentGroup.Item
                    key={priceItem.price_id}
                    value={index.toString()}
                    h="fit-content"
                    flex="1"
                    py="8px"
                    cursor="pointer"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Text opacity="50%">{priceItem.size.grams}г</Text>
                    <Heading fontWeight="700" fontSize="3xl">
                        {priceItem.price}
                        <Mark color="accent">р</Mark>
                    </Heading>
                    <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
            ))}
        </SegmentGroup.Root>
    )
}
