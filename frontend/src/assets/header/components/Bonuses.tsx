import { Flex, Text } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { RiBearSmileFill } from 'react-icons/ri'
import { useUserContext } from '@/contexts/UserContext.tsx'

export default function Bonuses() {
    const { user } = useUserContext()

    return (
        <>
            {user && (
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
                        {user.coins}
                    </Text>
                </Flex>
            )}
        </>
    )
}
