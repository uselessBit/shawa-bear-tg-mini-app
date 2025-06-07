import { Dialog, Text, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

type LimitDialogProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    message: ReactNode
}

export default function LimitDialog({
    isOpen,
    onClose,
    title,
    message,
}: LimitDialogProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} placement="center">
            <Dialog.Backdrop bg="back/90" backdropFilter="blur(8px)" />
            <Dialog.Positioner>
                <Dialog.Content
                    bg="card"
                    p="gap"
                    rounded="42px"
                    gap="gap"
                    w="90%"
                >
                    <Dialog.Header p="0" pt="gap">
                        <Dialog.Title
                            textAlign="center"
                            fontSize="2xl"
                            fontWeight="700"
                            w="full"
                        >
                            {title}
                        </Dialog.Title>
                        <Dialog.CloseTrigger
                            position="absolute"
                            right="24px"
                            top="24px"
                        />
                    </Dialog.Header>

                    <Dialog.Body px="0" py="gap">
                        <Text fontSize="lg" textAlign="center">
                            {message}
                        </Text>
                    </Dialog.Body>

                    <Dialog.Footer p="0">
                        <Button
                            w="full"
                            onClick={onClose}
                            bg="accent"
                            h="56px"
                            rounded="full"
                            color="text"
                            fontWeight="700"
                            fontSize="lg"
                        >
                            Понятно
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}
