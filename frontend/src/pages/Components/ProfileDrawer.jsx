import React, { useState } from "react";
import {
    Flex,
    Text,
    IconButton,
    useColorModeValue,
    Center,
    Image,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react";
import icons from "../../icons";

export default function ProductDrawer() {
    const textClr = useColorModeValue("textColor.100", "textColor.900");
    const accentColor = useColorModeValue("accentColor.100", "accentColor.900");

    return (
        <>
            <Center>
                <Flex
                    w="88%"
                    mt={6}
                    fontFamily="Montserrat"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Text
                        fontWeight="extrabold"
                        fontSize="clamp(20px, 10vw, 60px)"
                        textAlign="center"
                        mb={3}
                    >
                        Профиль
                    </Text>

                    <Box position="relative">
                        <Image src="Profile.png" borderRadius={60} />

                        <Menu>
                            <MenuButton
                                icon={icons.changePicture({ color: textClr })}
                                backgroundColor={accentColor}
                                borderRadius={32}
                                position="absolute"
                                right={8}
                                top={8}
                                w={16}
                                h={16}
                                _hover="none"
                            >{icons.changePicture({ color: textClr })}</MenuButton>
                            <MenuList>
                                <MenuItem>Загрузить с устройства</MenuItem>
                                <MenuItem>Сделать фото</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>

                    <Text
                        fontWeight="extrabold"
                        fontSize="clamp(20px, 10vw, 60px)"
                        lineHeight="clamp(20px, 12vw, 70px)"
                        textAlign="center"
                        my={3}
                    >
                        Александр
                        <br />
                        Лучинович
                    </Text>

                    <Text
                        fontWeight="semibold"
                        fontSize="clamp(20px, 5vw, 30px)"
                        mb={6}
                    >
                        +375 (33) 910-88-36
                    </Text>
                </Flex>
            </Center>
        </>
    );
}
