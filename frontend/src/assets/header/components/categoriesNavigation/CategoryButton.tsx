import { Button, Text } from '@chakra-ui/react'

type CategoryButtonProps = {
    text: string
    isActive: boolean
    onClick: () => void
    innerRef?: (node: HTMLButtonElement | null) => void
}

export default function CategoryButton({
    text,
    isActive,
    onClick,
    innerRef,
}: CategoryButtonProps) {
    return (
        <Button
            ref={innerRef}
            bg={`${isActive ? 'gray' : 'back'}`}
            rounded="full"
            h="hb"
            px="24px"
            opacity={`${isActive ? '100%' : '50%'}`}
            onClick={onClick}
        >
            <Text color="text" fontWeight="600" fontSize="xs">
                {text}
            </Text>
        </Button>
    )
}
