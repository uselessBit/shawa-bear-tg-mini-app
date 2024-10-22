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

    const productInfo = {
        title: "Чикен",
        sizes: ["300г", "400г", "500г"],
        prices: ["7.5", "9.5", "11.5"],
        image: "shava1.png",
        selectedIndex: 1,
    };

    const selectedSize = productInfo.sizes[productInfo.selectedIndex];
    const selectedPrice = productInfo.prices[productInfo.selectedIndex];
    const { integer, decimal } = formatPrice(selectedPrice);

    return (
        <>
            <Center>
                <Flex
                    w="88%"
                    mt={10}
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
                        <Flex mt={6} gap="4%">
                            <Image src={productInfo.image} w="48%" borderRadius={16} />

                            <Box w="48%">
                                <Text
                                    fontSize="clamp(20px, 5vw, 40px)"
                                    lineHeight="clamp(20px, 5vw, 40px)"
                                    fontWeight="semibold"
                                    textAlign="left"
                                >
                                    Донер {productInfo.title}
                                </Text>
                                <Flex alignItems="flex-end" h="fit-content">
                                    <Text
                                        fontWeight="bold"
                                        fontSize="clamp(18px, 6vw, 42px)"
                                        textAlign="center"
                                    >
                                        {integer}
                                        <Text as="span" fontSize="clamp(10px, 3vw, 22px)">
                                            .{decimal}
                                            <Text as="span" color={accentColor}>
                                                р
                                            </Text>
                                        </Text>
                                    </Text>
                                    <Text
                                        opacity="0.5"
                                        fontSize="clamp(10px, 2.5vw, 16px)"
                                        textAlign="center"
                                        h="clamp(10px, 1vw, 16px)"
                                    >
                                        {selectedSize}
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                    </Text>
                </Flex>
            </Center>
        </>
    );
}
