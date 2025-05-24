import { Button } from '@chakra-ui/react'
import { HiOutlineTrash } from 'react-icons/hi'

type DeleteProductButtonProps = {
    onDelete: () => void
}

export default function DeleteProductButton({
    onDelete,
}: DeleteProductButtonProps) {
    return (
        <Button
            pos="absolute"
            right="0"
            rounded="full"
            h="40px"
            w="hb"
            bg="back"
            color="text"
            onClick={onDelete}
            _hover={{ bg: 'red.100' }}
        >
            <HiOutlineTrash />
        </Button>
    )
}
