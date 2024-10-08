import React from "react";
import {
    Box,
    Flex,
    IconButton,
    useColorModeValue,
    Input,
    Icon,
} from "@chakra-ui/react";

export default function Layout() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const textClr = useColorModeValue("textColor.100", "textColor.900");

    return (
        <>
            <Box as="header" pos={"fixed"} top={6} w="100%" maxW="container.md" px={6}>
                <Flex
                    p={3}
                    boxShadow="light"
                    rounded="2xl"
                    bgColor={boxClr}
                    color={textClr}
                    justify="space-between"
                    align="center"
                >
                    <IconButton
                        variant="ghost"
                        size="md"
                        icon={
                            <Icon viewBox="0 0 18 14" color={textClr} fontSize="20px">
                                <line
                                    x1="1.625"
                                    y1="1"
                                    x2="16.625"
                                    y2="1"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="1.625"
                                    y1="7"
                                    x2="16.625"
                                    y2="7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="1.625"
                                    y1="13"
                                    x2="16.625"
                                    y2="13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </Icon>
                        }
                    />
                    <Flex justifyContent="center" alignItems="center">
                        <Icon viewBox="0 0 17 17" color={textClr} fontSize="18px">
                            <circle
                                cx="7.71429"
                                cy="7.71429"
                                r="6.71429"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                            />
                            <path
                                d="M12.9999 13L16.9999 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </Icon>
                        <Input type="text" placeholder="Найти донер" py={0} px={3} border="none" w="140px" fontFamily="Montserrat" color={textClr} />
                    </Flex>
                    <IconButton
                        variant="ghost"
                        size="md"
                        icon={
                            <Icon viewBox="0 0 17 21" color={textClr} fontSize="20px">
                                <circle cx="8.54884" cy="6.95338" r="5.95338" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.3647 20.3222C16.8416 20.0409 16.9868 19.424 16.6693 18.9704C14.8665 16.394 11.8768 14.7091 8.4936 14.7091C5.11041 14.7091 2.12074 16.394 0.317891 18.9704C0.000446365 19.424 0.145615 20.0409 0.622483 20.3222C1.11463 20.6126 1.73499 20.4134 2.07419 19.9536C3.52577 17.9856 5.86061 16.7091 8.4936 16.7091C11.1266 16.7091 13.4614 17.9856 14.913 19.9536C15.2522 20.4134 15.8726 20.6126 16.3647 20.3222Z" fill="currentColor" />
                            </Icon>
                        }
                    />
                </Flex>
            </Box>
        </>
    );
}
