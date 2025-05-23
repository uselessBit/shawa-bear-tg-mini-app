import { Drawer, Heading, CloseButton, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoArrowBackOutline } from 'react-icons/io5'
import ConfirmOrderButton from './ConfirmOrderButton'

const MotionHeader = motion(Drawer.Header)
const MotionBody = motion(Drawer.Body)
const MotionFooter = motion(Drawer.Footer)

export const ConfirmOrderPage = {
    Header: ({ onBack }: { onBack: () => void }) => (
        <MotionHeader
            position="relative"
            py="24px"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <CloseButton
                position="absolute"
                left="24px"
                top="20px"
                onClick={onBack}
            >
                <Icon as={IoArrowBackOutline} boxSize={6} />
            </CloseButton>
            <Heading size="2xl" fontWeight="800" textAlign="center" w="full">
                Оформление
            </Heading>
        </MotionHeader>
    ),

    Body: () => (
        <MotionBody
            px="12px"
            py="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Контент оформления заказа */}
        </MotionBody>
    ),

    Footer: () => (
        <MotionFooter
            p="12px"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <ConfirmOrderButton />
        </MotionFooter>
    ),
}
