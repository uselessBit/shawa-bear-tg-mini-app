import { Button, Text } from '@chakra-ui/react'

type CategoryButtonProps = {
    text: string
    isActive: boolean
    onClick: () => void
}

export default function CategoryButton({
    text,
    isActive,
    onClick,
}: CategoryButtonProps) {
    return (
        <>
            {isActive ? (
                <Button
                    bg="gray"
                    rounded="full"
                    h="hb"
                    px="24px"
                    onClick={onClick}
                >
                    <Text color="text" fontWeight="600" fontSize="xs">
                        {text}
                    </Text>
                </Button>
            ) : (
                <Button
                    bg="back"
                    rounded="full"
                    h="hb"
                    px="24px"
                    opacity="50%"
                    onClick={onClick}
                >
                    <Text color="text" fontWeight="600" fontSize="xs">
                        {text}
                    </Text>
                </Button>
            )}
        </>
    )
}
