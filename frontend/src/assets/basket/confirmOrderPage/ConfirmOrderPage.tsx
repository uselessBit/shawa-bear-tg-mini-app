import {
    Drawer,
    Heading,
    CloseButton,
    Icon,
    Flex,
    Textarea,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoArrowBackOutline } from 'react-icons/io5'
import ConfirmOrderButton from './components/ConfirmOrderButton.tsx'
import CustomSelect from './components/CustomSelect.tsx'
import { Input } from '@chakra-ui/react'
import { withMask } from 'use-mask-input'

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
            <Flex direction="column" gap="12px" h="full">
                <CustomSelect />
                <Input
                    bg="back"
                    borderWidth="0"
                    outline="none"
                    boxShadow="none"
                    h="56px"
                    px="24px"
                    rounded="full"
                    size="lg"
                    fontWeight="500"
                    placeholder="Имя"
                />
                <Input
                    bg="back"
                    borderWidth="0"
                    outline="none"
                    boxShadow="none"
                    h="56px"
                    rounded="full"
                    size="lg"
                    fontWeight="500"
                    px="24px"
                    placeholder="+375 (99) 999-99-99"
                    ref={withMask('+375 (99) 999-99-99')}
                />
                <CustomSelect />
                <CustomSelect />
                <Textarea
                    bg="back"
                    borderWidth="0"
                    outline="none"
                    boxShadow="none"
                    flex="1"
                    rounded="28px"
                    size="lg"
                    fontWeight="500"
                    px="24px"
                    resize="none"
                    placeholder="Комментарий к заказу..."
                />
            </Flex>
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
