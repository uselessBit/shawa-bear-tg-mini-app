import {
    Button,
    Popover,
    Portal,
    Grid,
    GridItem,
    Box,
    CloseButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Price } from '@/types/Products'
import { IoClose } from 'react-icons/io5'

type ProductInfoProps = {
    price: Price
}

export default function ProductInfo({ price }: ProductInfoProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover.Root
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            positioning={{ placement: 'bottom-start' }}
        >
            <Popover.Trigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    fontSize="xl"
                    fontWeight="500"
                    rounded="full"
                    _open={{
                        bg: 'gray',
                    }}
                >
                    i
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content
                        bg="card/90"
                        backdropFilter="blur(12px)"
                        rounded="28px"
                    >
                        <Popover.Body>
                            <Grid templateColumns="repeat(2, 5fr)" gap="2">
                                <CloseButton
                                    position="absolute"
                                    right="8px"
                                    top="8px"
                                    w="fit"
                                    zIndex="10"
                                    onClick={() => setOpen(false)}
                                >
                                    <IoClose />
                                </CloseButton>
                                <GridItem
                                    colSpan={2}
                                    fontWeight="500"
                                    fontSize="md"
                                >
                                    Пищевая ценность на 100г
                                </GridItem>

                                <Box h="20px">Энерг. ценность</Box>
                                <Box h="20px" textAlign="right">
                                    {price.calories} ккал
                                </Box>

                                <Box h="20px">Белки</Box>
                                <Box h="20px" textAlign="right">
                                    {price.proteins} г
                                </Box>

                                <Box h="20px">Жиры</Box>
                                <Box h="20px" textAlign="right">
                                    {price.fats} г
                                </Box>

                                <Box h="20px">Углеводы</Box>
                                <Box h="20px" textAlign="right">
                                    {price.carbohydrates} г
                                </Box>
                            </Grid>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}
