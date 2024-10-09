import React from "react";
import { Box, Flex, Center, useColorModeValue, Input, Icon, Text } from "@chakra-ui/react";
import Header from "./Components/Header"
import MyCard from "./Components/Card"

export default function Layout() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const textClr = useColorModeValue("textColor.100", "textColor.900");

    return (
        <Center>
            <Header />

            <Box w="full" maxW="container.md" px={8} color={textClr} fontFamily="Montserrat" columns="170px">

                <Box mt={28}>
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

            </Box>
        </Center>
    );
}
