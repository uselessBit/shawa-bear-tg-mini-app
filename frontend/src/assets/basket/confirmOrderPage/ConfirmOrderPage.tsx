import { Drawer, Heading, CloseButton, Icon } from '@chakra-ui/react'
import ConfirmOrderButton from './ConfirmOrderButton'
import { IoArrowBackOutline } from 'react-icons/io5'

type ConfirmOrderPageProps = {
    closeConfirmPage: () => void
}

export default function ConfirmOrderPage({
    closeConfirmPage,
}: ConfirmOrderPageProps) {
    return (
        <>
            <Drawer.Header
                position="relative"
                py="24px"
                display="flex"
                flexDirection="column"
            >
                <CloseButton
                    position="absolute"
                    left="24px"
                    top="20px"
                    onClick={() => {
                        closeConfirmPage()
                    }}
                >
                    <Icon as={IoArrowBackOutline} boxSize={6} />
                </CloseButton>
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
