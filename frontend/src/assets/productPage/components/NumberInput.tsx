import { HStack, IconButton, NumberInput } from '@chakra-ui/react'
import { FaPlus, FaMinus } from 'react-icons/fa'

export default function CustomNumberInput() {
    return (
        <NumberInput.Root
            unstyled
            spinOnPress={false}
            bg="back"
            p="12px"
            rounded="full"
            defaultValue="1"
            min={1}
            max={10}
        >
            <HStack gap="2">
                <NumberInput.DecrementTrigger asChild>
                    <IconButton
                        bg="accent"
                        rounded="full"
                        size="xs"
                        color="text"
                    >
                        <FaMinus />
                    </IconButton>
                </NumberInput.DecrementTrigger>
                <NumberInput.ValueText
                    textAlign="center"
                    fontSize="xl"
                    fontWeight="700"
                    minW="24px"
                />
                <NumberInput.IncrementTrigger asChild>
                    <IconButton
                        bg="accent"
                        rounded="full"
                        size="xs"
                        color="text"
                    >
                        <FaPlus />
                    </IconButton>
                </NumberInput.IncrementTrigger>
            </HStack>
        </NumberInput.Root>
    )
}
