import { ReactNode } from 'react'
import { Box, Heading, Flex, CloseButton } from '@chakra-ui/react'
import { useConstructor } from '@/contexts/ConstructorContext'
import { IngredientCard } from './IngredientCard'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { useDrawer } from '@/contexts/DrawerContext.tsx'

export const StepWrapper = ({
    title,
    children,
}: {
    title: string
    children?: ReactNode
}) => {
    const { currentStep, ingredients, selectedItems, selectItem } =
        useConstructor()

    const filteredIngredients = ingredients.filter(
        (item) => item.type === currentStep
    )

    const { onClose } = useDrawer()

    return (
        <Box pos="relative" h="full">
            <Box>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
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

                    <Heading
                        size="2xl"
                        fontWeight="800"
                        py="12px"
                        textAlign="center"
                    >
                        {title}
                    </Heading>
                </motion.div>
            </Box>

            <Flex direction="column" gap={4} py="12px" maxW="600px" mx="auto">
                {filteredIngredients.map((item) => (
                    <IngredientCard
                        key={item.ingredient_id}
                        item={item}
                        isSelected={
                            selectedItems[item.type]?.some(
                                (selected) =>
                                    selected.ingredient_id ===
                                    item.ingredient_id
                            ) ?? false
                        }
                        onSelect={() => selectItem(item)}
                    />
                ))}
            </Flex>

            {children}
        </Box>
    )
}
