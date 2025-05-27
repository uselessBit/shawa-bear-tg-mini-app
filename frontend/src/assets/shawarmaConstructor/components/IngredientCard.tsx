import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Ingredient } from '@/types/Products'

export const IngredientCard = ({
    item,
    isSelected,
    onSelect,
}: {
    item: Ingredient
    isSelected: boolean
    onSelect: () => void
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Box
                p={4}
                borderRadius="xl"
                borderWidth="2px"
                borderColor={isSelected ? 'gray' : 'transparent'}
                bg={item.color || 'gray.50'}
                cursor="pointer"
                onClick={onSelect}
                transition="all 0.2s"
            >
                <Flex align="center" gap={4}>
                    <ImageSection item={item} />
                    <TextSection item={item} />
                </Flex>
            </Box>
        </motion.div>
    )
}

const ImageSection = ({ item }: { item: Ingredient }) => (
    <Box flexShrink={0} w="100px" h="100px">
        {item.image_url ? (
            <Image
                src={item.image_url}
                alt={item.name}
                w="full"
                h="full"
                objectFit="cover"
                borderRadius="md"
            />
        ) : (
            <Placeholder text="Нет фото" />
        )}
    </Box>
)

const TextSection = ({ item }: { item: Ingredient }) => (
    <Box flex={1}>
        <Text fontSize="xl" fontWeight="600" mb={2}>
            {item.name}
        </Text>
        <Text fontSize="lg" color="gray.600">
            {item.price} ₽
        </Text>
        {item.description && (
            <Text mt={2} fontSize="sm" color="gray.500">
                {item.description}
            </Text>
        )}
    </Box>
)

const Placeholder = ({ text }: { text: string }) => (
    <Box
        w="full"
        h="full"
        bg="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
    >
        <Text fontSize="sm" color="gray.500">
            {text}
        </Text>
    </Box>
)
