import { HStack, IconButton, NumberInput, Icon } from '@chakra-ui/react'
import { FaPlus, FaMinus } from 'react-icons/fa'

type NumberInputProps = {
    setQuantity: (quantity: number) => void
    small?: boolean
    defaultValue?: string
}

export default function CustomNumberInput({
    setQuantity,
    small,
    defaultValue,
}: NumberInputProps) {
    return (
        <NumberInput.Root
            unstyled
            spinOnPress={false}
            onValueChange={(e) => setQuantity(Number(e.value))}
            bg="back"
            p={small ? '8px' : '12px'}
            h={small ? '40px' : '56px'}
            rounded="full"
            defaultValue={defaultValue ? defaultValue : '1'}
            min={1}
            max={10}
        >
            <HStack gap="2">
                <NumberInput.DecrementTrigger asChild>
                    <IconButton
                        bg="accent"
                        rounded="full"
                        maxH={small ? '24px' : '32px'}
                        minW={small ? '24px' : '32px'}
                        color="text"
                    >
                        <Icon as={FaMinus} boxSize={small ? 2 : 4} />
                    </IconButton>
                </NumberInput.DecrementTrigger>
                <NumberInput.ValueText
                    textAlign="center"
                    fontSize={small ? 'md' : 'xl'}
                    fontWeight="700"
                    minW={small ? '10px' : '24px'}
                    color="text"
                />
                <NumberInput.IncrementTrigger asChild>
                    <IconButton
                        bg="accent"
                        rounded="full"
                        maxH={small ? '24px' : '32px'}
                        minW={small ? '24px' : '32px'}
                        color="text"
                    >
                        <Icon as={FaPlus} boxSize={small ? 2 : 4} />
                    </IconButton>
                </NumberInput.IncrementTrigger>
            </HStack>
        </NumberInput.Root>
    )
}
