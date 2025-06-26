import { Flex, Text } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { RiBearSmileFill } from 'react-icons/ri'
import { useOrder } from '@/contexts/OrderContext'

export default function Bonuses() {
    const { virtualCoins } = useOrder()

    return (
        <>
            {virtualCoins !== null && (
                <Flex
                    bg="gray"
                    width="fit"
                    px="12px"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                    gap="6px"
                    h="hb"
                >
                    <Icon size="md" color="accent">
                        <RiBearSmileFill />
                    </Icon>

                    <Text fontWeight="700" fontSize="lm" color="text">
                        {virtualCoins}
                    </Text>
                </Flex>
            )}
        </>
    )
}
