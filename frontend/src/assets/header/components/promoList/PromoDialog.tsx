import { CloseButton, Dialog, Portal, Image } from '@chakra-ui/react'
import PromoCard from './PromoCard'

type PromoDialogProps = {
    image: string
    isViewed: boolean
    onClick?: () => void
}

export default function PromoDialog({
    image,
    isViewed,
    onClick,
}: PromoDialogProps) {
    return (
        <Dialog.Root size="full">
            <Dialog.Trigger asChild>
                <PromoCard
                    image={image}
                    isViewed={isViewed}
                    onClick={onClick}
                />
            </Dialog.Trigger>
            <Portal>
                <Dialog.Positioner>
                    <Dialog.Content bg="back/90" backdropFilter="blur(20px)">
                        <Dialog.Body
                            p="0"
                            pos="relative"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Image w="100%" src={image} />
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
