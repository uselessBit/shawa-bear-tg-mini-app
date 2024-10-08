import React from "react";
import {
    Box,
    Flex,
    Container,
    IconButton,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

export default function Layout() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const textClr = useColorModeValue("textColor.100", "textColor.900");

    return (
        <Box as="header" pos={"fixed"} top={6} w="100%">
            <Container maxW="container.xl" px={6}>
                <Flex
                    p={6}
                    shadow={"lg"}
                    rounded={"xl"}
                    bgColor={boxClr}
                    color={textClr}
                    justify="space-between"
                    align="center"
                >
                    <IconButton
                        aria-label="Search database"
                        variant="ghost"
                        size="lg"
                        icon={
                            <Icon viewBox="0 0 18 14" color={textClr}>
                                <line
                                    x1="1.625"
                                    y1="1"
                                    x2="16.625"
                                    y2="1"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                                <line
                                    x1="1.625"
                                    y1="7"
                                    x2="16.625"
                                    y2="7"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                                <line
                                    x1="1.625"
                                    y1="13"
                                    x2="16.625"
                                    y2="13"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                            </Icon>
                        }
                    />
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon viewBox="0 0 200 200" color="red.500">
                                <g clip-path="url(#clip0_86_191)">
                                    <circle
                                        cx="7.71429"
                                        cy="7.71429"
                                        r="6.71429"
                                        stroke="#252525"
                                        stroke-width="2"
                                    />
                                    <path
                                        d="M12.9999 13L16.9999 17"
                                        stroke="#252525"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_86_191">
                                        <rect
                                            width="18"
                                            height="18"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </Icon>
                        </InputLeftElement>
                        <Input type="tel" placeholder="Phone number" />
                    </InputGroup>
                </Flex>
            </Container>
        </Box>
    );
}
