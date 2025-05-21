import { Drawer, Heading } from '@chakra-ui/react'
import ToConfirmOrder from './components/ToConfirmOrder'

export default function ProductPage() {
    return (
        <>
            <Drawer.Header py="gap" display="flex" flexDirection="column">
                <Heading color="text" fontWeight="800" size="2xl">
                    Корзина
                </Heading>
            </Drawer.Header>

            <Drawer.Body p="12px"></Drawer.Body>

            <Drawer.Footer p="12px">
                <ToConfirmOrder />
            </Drawer.Footer>
        </>
    )
}
