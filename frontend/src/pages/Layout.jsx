import React from "react";
import { Box, Center, useColorModeValue, Text, useDisclosure } from "@chakra-ui/react";
import Header from "./Components/Header"
import MainCard from "./Components/MainCard"
import MainDrawer from "./Components/MainDrawer"
import ProductDrawer from "./Components/ProductDrawer"

export default function Layout() {
    const textClr = useColorModeValue("textColor.100", "textColor.900");
    const prices = ["6.5", "8.5", "10.5"];
    const sizes = ["300г", "400г", "500г"];
    const title = "Чикен";
    const image = "shava1.png";

    const productInfo = {
        title,
        sizes,
        prices,
        image
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Center>
                <Header />

                <Box w="full" maxW="container.md" px={8} color={textClr} css={`column-count: 2;`} gap={6} mt={28}>
                    <Box mb={6}>
                        <Text fontWeight="bold" fontSize="clamp(10px, 7.2vw, 56px)" lineHeight="clamp(10px, 7.2vw, 56px)">
                            Найдено 23 донера
                        </Text>
                    </Box>

                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                    <MainCard product={productInfo} onOpen={onOpen} />
                </Box>
            </Center>

            <MainDrawer isOpen={isOpen} onClose={onClose} children={
                <ProductDrawer product={productInfo} />
            } />
        </>
    );
}
