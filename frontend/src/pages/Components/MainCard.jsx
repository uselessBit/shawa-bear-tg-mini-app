import React from "react";
import {
    Card,
    CardBody,
    Image,
    Stack,
    Text,
    Flex,
    CardFooter,
    useColorModeValue,
    Box,
} from "@chakra-ui/react";

export default function MainCard({ product, onOpen }) {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const accentColor = useColorModeValue("accentColor.100", "accentColor.900");

    const formatPrice = (price) => {
        const [integer, decimal] = price.split(".");
        return { integer, decimal };
    };

    return (
        <>
            <Card 
                borderRadius={26} 
                w="full" 
                mb={6} 
                css={`break-inside: avoid;`} 
                boxShadow="light" 
                backgroundColor={boxClr} 
                cursor="pointer"
                onClick={onOpen} 
            >
                <CardBody p={0}>
                    <Image
                        src={product.image}
                        borderRadius={26}
                        pos="absolute"
                    />
                    <Box h="clamp(100px, calc(44vw - 40px), 300px)" />
                    <Stack>
                        <Text
                            fontWeight="bold"
                            fontSize="clamp(12px, 3.5vw, 26px)"
                            textAlign="center"
                            h="clamp(4px, 1vw, 16px)"
                        >
                            Донер
                        </Text>
                        <Text
                            fontWeight="bold"
                            fontSize="clamp(20px, 6vw, 48px)"
                            textAlign="center"
                            h="clamp(10px, 8vw, 66px)"
                        >
                            {product.title}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter p={3}>
                    <Flex w="full" justifyContent="space-around">
                        {product.prices.map((price, index) => {
                            const { integer, decimal } = formatPrice(price);

                            return (
                                <Flex key={index} flexDirection="column">
                                    <Text
                                        opacity="0.5"
                                        fontSize="clamp(10px, 2.5vw, 16px)"
                                        textAlign="center"
                                        h="clamp(10px, 1vw, 16px)"
                                    >
                                        {product.sizes[index]}
                                    </Text>
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
                                </Flex>
                            );
                        })}
                    </Flex>
                </CardFooter>
            </Card>
        </>
    );
}
