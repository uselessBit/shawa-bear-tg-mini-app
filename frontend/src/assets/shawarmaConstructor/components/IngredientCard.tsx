import { Box, Flex, Image, Text, Mark, Center } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Ingredient } from '@/types/Products'
import { FaPlus, FaMinus } from 'react-icons/fa'

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
                p={3}
                rounded="24px"
                borderWidth="0"
                bg={!isSelected ? `${item.color}/10` : `${item.color}/40`}
                cursor="pointer"
                onClick={onSelect}
                transition="all 0.2s"
            >
                <Flex align="center" gap={4}>
                    <ImageSection item={item} />
                    <TextSection item={item} isSelected={isSelected} />
                </Flex>
            </Box>
        </motion.div>
    )
}

const ImageSection = ({ item }: { item: Ingredient }) => (
    <Box flexShrink={0} w="80px" h="80px">
        {item.image_url ? (
            <Image
                src={`ingredients/${item.name}.png`}
                alt={item.name}
                w="full"
                h="full"
                objectFit="cover"
                rounded="12px"
            />
        ) : (
            <Placeholder text="Нет фото" />
        )}
    </Box>
)

const TextSection = ({
    item,
    isSelected,
}: {
    item: Ingredient
    isSelected: boolean
}) => (
    <Flex direction="column" justifyContent="space-between" h="100px" w="full">
        <Text fontSize="lg" fontWeight="600">
            {item.name}
        </Text>
        <Mark opacity="0.5" fontWeight="500" fontSize="md">
            {item.grams}г
        </Mark>
        <Flex justify="space-between">
            <Text
                fontSize="xs"
                color="text"
                bg="card"
                w="fit"
                px="20px"
                py="6px"
                rounded="50px"
                fontWeight="500"
            >
                {item.price}
                <Mark color="accent">р</Mark>
            </Text>
            <Center
                h="hb"
                bg={!isSelected ? 'accent' : 'transparent'}
                borderWidth="2px"
                borderColor={!isSelected ? 'accent' : 'text/10'}
                color="text"
                px="20px"
                rounded="full"
                fontWeight="600"
                fontSize="xl"
                w="50px"
                transition="all 0.2s"
            >
                {!isSelected ? <FaPlus /> : <FaMinus />}
            </Center>
        </Flex>
        {item.description && (
            <Text mt={2} fontSize="sm" color="gray.500">
                {item.description}
            </Text>
        )}
    </Flex>
)

const Placeholder = ({ text }: { text: string }) => (
    <Box
        w="full"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="12px"
        bg="text/10"
    >
        <Text fontSize="md" color="text">
            {text}
        </Text>
    </Box>
)
