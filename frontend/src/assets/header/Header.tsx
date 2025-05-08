import { Flex, Heading, Box, Center } from '@chakra-ui/react'
import Bonuses from './components/Bonuses.tsx'
import ProfileButton from './components/ProfileButton.tsx'
import PromoGroup from './components/PromoGroup.tsx'
import CategoriesGroup from './components/CategoriesGroup.tsx'

export default function Header() {
    return (
        <>
            <Box
                position="sticky"
                top="0"
                bg="back"
                backdropFilter="blur(10px)"
                p="gap"
                zIndex="3"
                w="100%"
            >
                <Box position="relative">
                    <Flex justify="space-between" alignItems="center">
                        <Bonuses />
                        <ProfileButton />
                    </Flex>

                    <Center
                        h="hb"
                        w="full"
                        position="absolute"
                        top="0"
                        pointerEvents="none"
                    >
                        <Heading color="text" fontWeight="800" size="2xl">
                            Меню
                        </Heading>
                    </Center>
                </Box>
            </Box>

            <PromoGroup />

            <Box position="sticky" top="64px" zIndex="2">
                <CategoriesGroup />
            </Box>
        </>
    )
}
