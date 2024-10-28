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
    createListCollection,
} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"

export default function ConfirnOrderDrawer() {
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
            prevAmount > 0 ? prevAmount - 1 : prevAmount
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

    const basket = (parseFloat(selectedPrice) * amount).toString();
    const [iBasket, dBasket] = basket.split(".");

    const frameworks = createListCollection({
        items: [
            { label: "React.js", value: "react" },
            { label: "Vue.js", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
        ],
    })

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
                        Самовывоз
                        <SelectRoot collection={frameworks} size="sm" width="320px">
                            <SelectLabel>Select framework</SelectLabel>
                            <SelectTrigger>
                                <SelectValueText placeholder="Select movie" />
                            </SelectTrigger>
                            <SelectContent>
                                {frameworks.items.map((movie) => (
                                    <SelectItem item={movie} key={movie.value}>
                                        {movie.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    </Text>
                </Flex>

                <Container variant="bot-container">
                    <Flex gap={8} alignItems="center">
                        <Text
                            fontWeight="extrabold"
                            fontSize="clamp(18px, 12vw, 62px)"
                            lineHeight="clamp(18px, 10vw, 42px)"
                            textAlign="center"
                            fontFamily="Montserrat"
                        >
                            {iBasket}
                            <Text as="span" fontSize="clamp(10px, 7vw, 32px)">
                                {dBasket !== undefined ? "." + dBasket : ""}
                                <Text as="span" color={accentColor}>
                                    р
                                </Text>
                            </Text>
                        </Text>

                        <Button variant="main-button">Оформить</Button>
                    </Flex>
                </Container>
            </Center>
        </>
    );
}
