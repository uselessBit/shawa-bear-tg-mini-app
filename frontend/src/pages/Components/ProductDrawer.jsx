import React, { useState } from 'react';
import {
    Flex,
    Text,
    Box,
    useColorModeValue,
    Center,
    Image
} from '@chakra-ui/react';

export default function ProductDrawer({ product }) {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const accentColor = useColorModeValue("accentColor.100", "accentColor.900");
    const bgColor = useColorModeValue("bgColor.100", "bgColor.900");

    const [selectedIndex, setSelectedIndex] = useState(0);

    const composition = ["chicken.png", "tomato.png", "cucumber.png", "cabbage.png", "red-sauce.png", "garlic.png"];
    const colors = ["rgba(205, 121, 48, 0.08)", "rgba(178, 40, 18, 0.08)", "rgba(34, 83, 25, 0.08)", "rgba(0, 112, 25, 0.08)", "rgba(183, 58, 43, 0.08)", "rgba(143, 94, 87, 0.08)"];

    const formatPrice = (price) => {
        const [integer, decimal] = price.split(".");
        return { integer, decimal };
    };

    return (
        <>
            <Image
                src={product.image}
                pos="absolute"
                top={0}
                w="container.md"
            />
            <Center>
                <Flex w="88%" mt="clamp(12px, 90vw, 670px)" fontFamily="Montserrat" flexDirection="column" alignItems="center">
                    <Text
                        fontWeight="extrabold"
                        fontSize="clamp(20px, 10vw, 60px)"
                        lineHeight="clamp(20px, 10vw, 60px)"
                        textAlign="center"
                        mb={6}
                    >
                        Донер {product.title}
                    </Text>
                    <Center w="full">
                        <Flex w="full" justifyContent="space-between" backgroundColor={bgColor} p={3} borderRadius={22} gap={3}>
                            {product.prices.map((price, index) => {
                                const { integer, decimal } = formatPrice(price);
                                const isSelected = index === selectedIndex;

                                return (
                                    <Flex
                                        key={index}
                                        flexDirection="column"
                                        py={2}
                                        borderRadius={16}
                                        flex={1}
                                        boxShadow={isSelected ? "selectLight" : ""}
                                        backgroundColor={isSelected ? boxClr : bgColor}
                                        zIndex={isSelected ? "1" : ""}
                                        cursor="pointer"
                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        <Text
                                            opacity="0.5"
                                            fontSize="clamp(10px, 4vw, 30px)"
                                            textAlign="center"
                                            h="clamp(10px, 4vw, 30px)"
                                        >
                                            {product.sizes[index]}
                                        </Text>
                                        <Text
                                            fontWeight="extrabold"
                                            fontSize="clamp(18px, 10vw, 82px)"
                                            textAlign="center"
                                        >
                                            {integer}
                                            <Text as="span" fontSize="clamp(10px, 5vw, 42px)">
                                                .{decimal}
                                                <Text as="span" color={accentColor}>
                                                    р
                                                </Text>
                                            </Text>
                                        </Text>
                                    </Flex>
                                );
                            })}
                        </Flex>
                    </Center>

                    <Text fontWeight="semibold" fontSize="clamp(10px, 6vw, 46px)" my={4}>Состав</Text>

                    <Flex flexWrap="wrap" width="full" gap={6} mb={6}>
                        {composition.map((item, index) => {
                            return (
                                <Box key={index} backgroundColor={colors[index]} flex="1" borderRadius={16} p={4}>
                                    <Image src={item} minW="clamp(50px, 17vw, 150px)" />
                                </Box>
                            );
                        })}
                    </Flex>
                </Flex>
            </Center>
        </>
    );
}
