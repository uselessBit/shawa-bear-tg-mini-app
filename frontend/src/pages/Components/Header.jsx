import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, useColorModeValue, Input, Center, Skeleton } from "@chakra-ui/react";
import icons from "../../icons"

export default function Layout() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const textClr = useColorModeValue("textColor.100", "textColor.900");

    return (
        <Box as="header" pos="fixed" top={8} w="full" maxW="container.md" px={8} zIndex={2}>
            <Flex p={2} boxShadow="light" bgColor={boxClr} color={textClr} justify="space-between" align="center" borderRadius={16}>

                <IconButton variant="ghost" size="md" icon={icons.burger({ color: textClr })} />

                <Flex justifyContent="center" alignItems="center">
                    {icons.search({ color: textClr })}
                    <Input type="text" placeholder="Найти донер" p={0} pl={3} border="none" w="140px" fontFamily="Montserrat" color={textClr} fontSize="sm" />
                </Flex>

                <IconButton variant="ghost" size="md" icon={icons.profile({ color: textClr })} />

            </Flex>
        </Box>
    );
}
