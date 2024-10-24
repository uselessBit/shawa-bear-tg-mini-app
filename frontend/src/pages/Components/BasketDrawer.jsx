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

    let [amount, setAmount] = useState(1);

    const formatPrice = (price) => {
        const [integer, decimal] = price.split(".");
        return { integer, decimal };
    };

    const handleAddAmount = () => {
        setAmount((prevAmount) =>
            prevAmount < 9 ? prevAmount + 1 : prevAmount
        );
    };

    const handleSubAmount = () => {
        setAmount((prevAmount) =>
            prevAmount > 1 ? prevAmount - 1 : prevAmount
        );
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
                        <Flex mt={6} gap="8%">
                            <Image src={productInfo.image} w="46%" borderRadius={16} shadow="light" />

                            <Flex w="46%" flexDirection="column" justifyContent="space-between">
                                <Text
                                    fontSize="clamp(20px, 5vw, 40px)"
                                    lineHeight="clamp(20px, 6vw, 50px)"
                                    fontWeight="semibold"
                                    textAlign="left"
                                >
                                    Донер
                                    <br />
                                    <Text as="span" fontWeight="extrabold" fontSize="clamp(20px, 7vw, 50px)">
                                        {productInfo.title}
                                    </Text>
                                </Text>
                                <Flex alignItems="flex-end" h="fit-content" gap={4}>
                                    <Text
                                        fontWeight="extrabold"
                                        fontSize="clamp(18px, 12vw, 82px)"
                                        textAlign="center"
                                    >
                                        {integer}
                                        <Text as="span" fontSize="clamp(10px, 7vw, 62px)">
                                            .{decimal}
                                            <Text as="span" color={accentColor}>
                                                р
                                            </Text>
                                        </Text>
                                    </Text>
                                    <Text
                                        opacity="0.5"
                                        fontSize="clamp(10px, 4vw, 46px)"
                                        height="clamp(20px, 9vw, 50px)"
                                        textAlign="center"
                                        fontWeight="normal"
                                    >
                                        {selectedSize}
                                    </Text>
                                </Flex>

                                <Flex gap={4} alignItems="center">
                                    <Button
                                        variant="main-button"
                                        maxW={14}
                                        onClick={handleSubAmount}
                                        opacity={amount === 1 ? 0.5 : 1}
                                    >
                                        -
                                    </Button>
                                    <Text fontSize={24} fontWeight="bold" width={6} textAlign="center">
                                        {amount}
                                    </Text>
                                    <Button
                                        variant="main-button"
                                        maxW={14}
                                        onClick={handleAddAmount}
                                        opacity={amount === 9 ? 0.5 : 1}
                                    >
                                        +
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Text>
                </Flex>

                <Container variant="bot-container">
                    <Flex gap={8} alignItems="center">
                        <Text
                            fontWeight="extrabold"
                            fontSize="clamp(18px, 12vw, 82px)"
                            textAlign="center"
                            fontFamily="Montserrat"
                        >
                            {integer}
                            <Text as="span" fontSize="clamp(10px, 7vw, 62px)">
                                .{decimal}
                                <Text as="span" color={accentColor}>
                                    р
                                </Text>
                            </Text>
                        </Text>

                        <Button variant="main-button">Заказать</Button>
                    </Flex>
                </Container>
            </Center>
        </>
    );
}
