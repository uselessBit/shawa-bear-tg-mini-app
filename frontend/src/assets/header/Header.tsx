import {
    Flex,
    Heading,
    Box,
    Center,
    Text,
    Button,
    Link,
} from '@chakra-ui/react'
import Bonuses from './components/Bonuses.tsx'
import ProfileButton from './components/ProfileButton.tsx'
import PromoGroup from './components/promoList/PromoGroup.tsx'
import CategoriesGroup from './components/categoriesNavigation/CategoriesGroup.tsx'
import MotionDrawer from '@/assets/MotionDrawer.tsx'
import ProfilePage from '@/assets/profile/ProfilePage.tsx'
import { useUserContext } from '@/contexts/UserContext'

type HeaderProps = {
    categories: string[]
    activeCategory: string
    setActiveCategory: (category: string) => void
}

export default function Header({
    categories,
    activeCategory,
    setActiveCategory,
}: HeaderProps) {
    const { user } = useUserContext()

    return (
        <>
            <Box
                position="sticky"
                top="0"
                bg="back"
                p="gap"
                zIndex="3"
                w="100%"
            >
                <Box position="relative">
                    <Flex justify="space-between" alignItems="center">
                        <Bonuses />
                        <MotionDrawer trigger={<ProfileButton />}>
                            <ProfilePage />
                        </MotionDrawer>
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

                    {user && user.is_admin && (
                        <Link
                            href="https://shawa-bear-tg-mini-app.onrender.com/admin/"
                            pos="absolute"
                            top="0"
                            right="40px"
                        >
                            <Button bg="gray" rounded="full" h="hb" px="16px">
                                <Text
                                    color="text"
                                    fontWeight="600"
                                    fontSize="xs"
                                >
                                    Админ
                                </Text>
                            </Button>
                        </Link>
                    )}
                </Box>
            </Box>

            <PromoGroup />

            <Box position="sticky" top="64px" zIndex="2">
                <CategoriesGroup
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            </Box>
        </>
    )
}
