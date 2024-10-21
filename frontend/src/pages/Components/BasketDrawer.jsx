import React, { useState } from "react";
import {
    Flex,
    Text,
    Box,
    useColorModeValue,
    Center,
    Image,
    Container,
    Button,
} from "@chakra-ui/react";

export default function BaskettDrawer() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const accentColor = useColorModeValue("accentColor.100", "accentColor.900");
    const bgColor = useColorModeValue("bgColor.100", "bgColor.900");

    const formatPrice = (price) => {
        const [integer, decimal] = price.split(".");
        return { integer, decimal };
    };

    return (
        <>
            <Center>
                <Flex
                    w="88%"
                    mt={6}
                    fontFamily="Montserrat"
                    flexDirection="column"
                    alignItems="center"
                    mb={20}
                >
                    <Text
                        fontWeight="extrabold"
                        fontSize="clamp(20px, 10vw, 60px)"
                        lineHeight="clamp(20px, 10vw, 60px)"
                        textAlign="center"
                        mb={6}
                    >
                        Корзина
                    </Text>
                </Flex>
            </Center>
        </>
    );
}
