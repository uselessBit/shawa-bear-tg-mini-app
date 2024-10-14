import React, { useState } from "react";
import { Box, Flex, IconButton, useColorModeValue, Input, InputGroup, InputLeftElement, useDisclosure } from "@chakra-ui/react";
import icons from "../../icons"
import ProfileDrawer from "./ProfileDrawer"
import MainDrawer from "./MainDrawer"

export default function Layout() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const textClr = useColorModeValue("textColor.100", "textColor.900");
    const bgColor = useColorModeValue("bgColor.100", "bgColor.900");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setInputValue("");
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <Box
                w="full"
                h={16}
                backgroundColor={bgColor}
                pos="fixed"
                top={0}
                zIndex={1}
            />

            <Box
                as="header"
                pos="fixed"
                top={8}
                w="full"
                maxW="container.md"
                px={8}
                zIndex={2}
            >

                <Flex
                    p={2}
                    boxShadow="light"
                    bgColor={boxClr}
                    color={textClr}
                    justify="space-between"
                    align="center"
                    borderRadius={16}
                >

                    <IconButton
                        variant="ghost"
                        size="md"
                        icon={icons.burger({ color: textClr })}
                        opacity={isFocused ? "0" : "1"}
                        userSelect={isFocused ? "none" : "auto"}
                        transition="opacity 0.3s ease-in-out"
                    />

                    <InputGroup
                        w={isFocused ? "full" : "140px"}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        transition="width 0.5s ease-in-out"
                    >
                        <InputLeftElement pointerEvents='none'>
                            {icons.search({ color: textClr })}
                        </InputLeftElement>

                        <Input
                            type="text"
                            placeholder="Найти донер"
                            border="none"
                            fontFamily="Montserrat"
                            color={textClr}
                            fontSize="sm"
                            focusBorderColor="transparent"
                            maxLength="20"
                            pr={0}
                            value={inputValue}
                            onChange={handleChange}
                        />
                    </InputGroup>

                    <IconButton
                        variant="ghost"
                        size="md"
                        icon={icons.profile({ color: textClr })}
                        onClick={onOpen}
                        opacity={isFocused ? "0" : "1"}
                        userSelect={isFocused ? "none" : "auto"}
                        transition="opacity 0.3s ease-in-out"
                    />

                </Flex>
            </Box>

            <MainDrawer isOpen={isOpen} onClose={onClose} children={
                <ProfileDrawer />
            } />
        </>
    );
}
