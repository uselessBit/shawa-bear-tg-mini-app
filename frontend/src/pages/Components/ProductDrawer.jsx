import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    useColorModeValue,
    Button,
    Text,
    Box,
    Flex,
    Image,
    Center
} from "@chakra-ui/react";

export default function ProductDrawer({ isOpen, onClose, productInfo }) {
    const textClr = useColorModeValue("textColor.100", "textColor.900");

    return (
        <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
        >

            <DrawerContent
                borderTopRadius={26}
                w="container.md"
                top={28}
            >
                <Center>
                    <Box
                        w="full"
                        h="8px"
                        bg={textClr}
                        borderRadius="full"
                        maxW="120px"
                        cursor="pointer"
                        onClick={onClose}
                        position="absolute"
                        top="-4"
                    />
                </Center>

                <DrawerBody p={0} borderRadius={26}>
                    <Image
                        src='shava1.png'
                        w="container.md"
                    />

                    <DrawerHeader>{productInfo.title}</DrawerHeader>

                    <Flex justify="space-between" mb={4}>
                        {productInfo.sizes.map((size, index) => (
                            <Box key={index} p={4} border="1px solid" borderRadius="md">
                                <Text>{size}</Text>
                                <Text fontWeight="bold">{productInfo.prices[index]} р</Text>
                            </Box>
                        ))}
                    </Flex>
                </DrawerBody>

                <DrawerFooter>
                    <Button>В корзину</Button>
                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    );
}
