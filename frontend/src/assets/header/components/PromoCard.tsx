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
        <>
            {isViewed ? (
                <Button
                    bg="back"
                    rounded="20px"
                    h="160px"
                    w="120px"
                    p="0"
                    overflow="hidden"
                    opacity="50%"
                >
                    <Image src="/promo.webp" h="full" w="full" />
                </Button>
            ) : (
                <Button
                    bg="back"
                    rounded="20px"
                    borderWidth="1px"
                    borderColor="accent"
                    h="160px"
                    w="120px"
                    p="0"
                    overflow="hidden"
                    opacity="100%"
                    onClick={onClick}
                >
                    <Image src={image} h="154px" w="114px" rounded="17px" />
                </Button>
            )}
        </>
    )
}
