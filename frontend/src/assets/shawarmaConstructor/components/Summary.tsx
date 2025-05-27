import {
    VStack,
    Heading,
    Text,
    Box,
    Flex,
    Image,
    CloseButton,
} from '@chakra-ui/react'
import { useConstructor } from '@/contexts/ConstructorContext'
import { NavigationButtons } from './NavigationButtons.tsx'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext.tsx'

export const Summary = () => {
    const { selectedItems, totalPrice } = useConstructor()
    const { onClose } = useDrawer()

    return (
        <VStack pos="relative" h="full" gap="12px" align="stretch">
            <CloseButton
                position="absolute"
                left="8px"
                top="8px"
                w="fit"
                onClick={onClose}
                zIndex="10"
            >
                <IoClose />
            </CloseButton>

            <Heading size="2xl" fontWeight="800" textAlign="center" py="12px">
                Ваш заказ
            </Heading>

            <VStack gap={4} align="stretch">
                {Object.entries(selectedItems).map(([type, item]) => (
                    <Flex
                        key={type}
                        bg="gray.50"
                        p={4}
                        borderRadius="xl"
                        align="center"
                        gap={4}
                    >
                        {item.image_url ? (
                            <Image
                                src={item.image_url}
                                alt={item.name}
                                boxSize="80px"
                                borderRadius="md"
                                objectFit="cover"
                            />
                        ) : (
                            <Box
                                boxSize="80px"
                                bg={item.color || 'gray.200'}
                                borderRadius="md"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize="sm">Нет фото</Text>
                            </Box>
                        )}
                        <Box>
                            <Text fontSize="lg" fontWeight="600">
                                {item.name}
                            </Text>
                            <Text color="gray.600">{item.price} ₽</Text>
                        </Box>
                    </Flex>
                ))}
            </VStack>

            <Box pt={4} borderTopWidth="1px">
                <Flex justify="space-between" fontSize="xl" fontWeight="600">
                    <Text>Итого:</Text>
                    <Text>{totalPrice} ₽</Text>
                </Flex>
            </Box>

            <NavigationButtons />
        </VStack>
    )
}
