import { Drawer, Heading, Flex } from '@chakra-ui/react'
import { useBasketContext } from '@/contexts/BasketContext.tsx'
import ConfirmOrderButton from './ConfirmOrderButton'

export default function ProductPage() {
    return (
        <>
            <Drawer.Header py="gap" display="flex" flexDirection="column">
                <Heading color="text" fontWeight="800" size="2xl">
                    Оформление
                </Heading>
            </Drawer.Header>

            <Drawer.Body px="12px" py="0"></Drawer.Body>

            <Drawer.Footer p="12px">
                <ConfirmOrderButton />
            </Drawer.Footer>
        </>
    )
}
