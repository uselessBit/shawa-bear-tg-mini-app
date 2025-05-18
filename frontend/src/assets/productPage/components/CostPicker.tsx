import { Mark, Text, Heading, SegmentGroup, Skeleton } from '@chakra-ui/react'
import { Price } from '@/types/Products'
import { ProductService } from '@/api/ProductService'

type CostPickerProps = {
    price: Price
}

export default function CostPicker({ price }: CostPickerProps) {
    const prices = ProductService.getAllPricesForProduct(
        price.product.product_id
    )

    if (!prices) {
        return <Skeleton rounded="32px" h="124px" w="full" />
    }

    return (
        <SegmentGroup.Root
            defaultValue={price.price_id.toString()}
            bg="back"
            p="12px"
            rounded="32px"
            gap="12px"
        >
            <SegmentGroup.Indicator rounded="20px" boxShadow="none" bg="gray" />
            {prices.map((priceItem) => (
                <SegmentGroup.Item
                    key={priceItem.price_id}
                    value={priceItem.price_id.toString()}
                    h="fit-content"
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
