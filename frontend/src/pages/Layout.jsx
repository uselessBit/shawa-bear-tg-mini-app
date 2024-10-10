import React from "react";
import { Box, Flex, Center, useColorModeValue, Input, SimpleGrid, Text } from "@chakra-ui/react";
import Header from "./Components/Header"
import MyCard from "./Components/Card"

export default function Layout() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const textClr = useColorModeValue("textColor.100", "textColor.900");

    return (
        <Center>
            <Header />

            <Box w="full" maxW="container.md" px={8} color={textClr} fontFamily="Montserrat" css={`column-count: 2;`} gap={6} mt={28}>
                <Box maxW={"165px"} mb={6}>
                    <Text fontWeight="bold" fontSize="3xl" lineHeight="40px">
                        Найдено 23 донера
                    </Text>
                </Box>

                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
                <MyCard />
            </Box>
        </Center>
    );
}
