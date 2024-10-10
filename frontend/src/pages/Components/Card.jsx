import React from "react";
import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Flex,
    CardFooter,
    Spacer,
    useColorModeValue,
    Center
} from "@chakra-ui/react";

export default function MyCard() {
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const accentColor = useColorModeValue("accentColor.100", "accentColor.900");

    return (
        <Card borderRadius={26} w="full" mb={6} css={`break-inside: avoid;`} boxShadow="light" backgroundColor={boxClr}>
            <CardBody p={0}>
                <Image
                    src='shava1.png'
                    alt='Green double couch with wooden legs'
                    borderRadius={26}
                />
                <Stack>
                    <Text fontWeight="bold" fontSize={16} textAlign="center" h={1}>
                        Донер
                    </Text>
                    <Text fontWeight="bold" fontSize={28} textAlign="center" h={6}>
                        Чикен
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Flex w="full" justify="center">
                    <Flex flexDirection="column">
                        <Text opacity="0.5" fontSize={10} textAlign="center" h={2}>300г</Text>
                        <Text fontWeight="bold" fontSize={22}>6<Text as="span" fontSize={12}>.5<Text as="span" color={accentColor}>р</Text></Text></Text>
                    </Flex>

                    <Spacer />

                    <Flex flexDirection="column">
                        <Text opacity="0.5" fontSize={10} textAlign="center" h={2}>400г</Text>
                        <Text fontWeight="bold" fontSize={22}>8<Text as="span" fontSize={12}>.5<Text as="span" color={accentColor}>р</Text></Text></Text>
                    </Flex>

                    <Spacer />

                    <Flex flexDirection="column">
                        <Text opacity="0.5" fontSize={10} textAlign="center" h={2}>500г</Text>
                        <Text fontWeight="bold" fontSize={22}>10<Text as="span" fontSize={12}>.5<Text as="span" color={accentColor}>р</Text></Text></Text>
                    </Flex>
                </Flex>
            </CardFooter>
        </Card>
    );
}
