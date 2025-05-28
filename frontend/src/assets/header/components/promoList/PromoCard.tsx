import { Button, Image } from '@chakra-ui/react'

type PromoCardProps = {
    image: string
    isViewed: boolean
    onClick?: () => void
}

export default function PromoCard({
    image,
    isViewed,
    onClick,
}: PromoCardProps) {
    return (
        <Button
            bg="back"
            rounded="20px"
            h="160px"
            w="120px"
            p="0"
            overflow="hidden"
            opacity={isViewed ? '50%' : '100%'}
            borderWidth={isViewed ? '0px' : '1px'}
            borderColor="accent"
            onClick={onClick}
        >
            <Image
                src={image}
                h={isViewed ? 'full' : '154px'}
                w={isViewed ? 'full' : '114px'}
                rounded={isViewed ? '0' : '17px'}
            />
        </Button>
    )
}
