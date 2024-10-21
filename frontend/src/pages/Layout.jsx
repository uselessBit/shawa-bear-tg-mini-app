import React from "react";
import {
    Box,
    Center,
    useColorModeValue,
    Text,
    Button,
    Container,
    Flex,
    useDisclosure,
} from "@chakra-ui/react";
import Header from "./Components/Header";
import MainCard from "./Components/MainCard";
import MainDrawer from "./Components/MainDrawer";
import BasketDrawer from "./Components/BasketDrawer";

export default function Layout() {
    const textClr = useColorModeValue("textColor.100", "textColor.900");
    const prices = ["6.5", "8.5", "10.5"];
    const sizes = ["300г", "400г", "500г"];
    const title = "Чикен";
    const image = "shava1.png";

    const { isOpen, onOpen, onClose } = useDisclosure();

    const productInfo = {
        title,
        sizes,
        prices,
        image,
    };

    const productInfo2 = {
        title: "Не чикен",
        sizes: ["300г", "400г", "500г"],
        prices: ["7.5", "9.5", "11.5"],
        image: "shava1.png",
    };

    return (
        <>
            <Center>
                <Header />

                <Box
                    w="full"
                    maxW="container.md"
                    px={8}
                    color={textClr}
                    css={`
                        column-count: 2;
                    `}
                    gap={6}
                    mt={28}
                    mb="105px"
                >
                    <Box mb={6}>
                        <Text
                            fontWeight="bold"
                            fontSize="clamp(10px, 7.2vw, 56px)"
                            lineHeight="clamp(10px, 7.2vw, 56px)"
                        >
                            Найдено 23 донера
                        </Text>
                    </Box>

                    <MainCard product={productInfo} />
                    <MainCard product={productInfo} />
                    <MainCard product={productInfo} />
                    <MainCard product={productInfo} />
                    <MainCard product={productInfo} />
                    <MainCard product={productInfo} />
                    <MainCard product={productInfo} />
                    <MainCard product={productInfo} />
                    <MainCard product={productInfo2} />
                </Box>

                <Container variant="bot-container">
                    <Flex>
                        <Button variant="main-button" onClick={onOpen}>
                            Корзина
                        </Button>
                    </Flex>
                </Container>
            </Center>

            <MainDrawer
                isOpen={isOpen}
                onClose={onClose}
                children={<BasketDrawer />}
            />
        </>
    );
}
