import React, { useRef, useState, useEffect } from 'react';
import {
    Drawer,
    Flex,
    DrawerContent,
    Text,
    DrawerOverlay,
    Box,
    useColorModeValue,
    Center,
    Image
} from '@chakra-ui/react';

export default function MainDrawer({ isOpen, onClose, product }) {
    const textClr = useColorModeValue("textColor.100", "textColor.900");
    const boxClr = useColorModeValue("boxColor.100", "boxColor.900");
    const accentColor = useColorModeValue("accentColor.100", "accentColor.900");
    const bgColor = useColorModeValue("bgColor.100", "bgColor.900");

    const [topOffset, setTopOffset] = useState(32);
    const [animatingBack, setAnimatingBack] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const drawerRef = useRef();
    const contentRef = useRef();
    const startTouchY = useRef(0);
    const startTime = useRef(0);
    const [scrollAtTop, setScrollAtTop] = useState(false);
    const [touchHandledOnce, setTouchHandledOnce] = useState(false);

    const composition = ["chicken.png", "tomato.png", "cucumber.png", "cabbage.png", "red-sauce.png", "garlic.png"];
    const colors = ["rgba(205, 121, 48, 0.08)", "rgba(178, 40, 18, 0.08)", "rgba(34, 83, 25, 0.08)", "rgba(0, 112, 25, 0.08)", "rgba(183, 58, 43, 0.08)", "rgba(143, 94, 87, 0.08)"];

    const formatPrice = (price) => {
        const [integer, decimal] = price.split(".");
        return { integer, decimal };
    };

    const handleTouchStart = (e) => {
        if (drawerRef.current && contentRef.current) {
            const scrollTop = contentRef.current.scrollTop;
    
            setScrollAtTop(scrollTop === 0);
    
            if (scrollTop === 0 && !touchHandledOnce) {
                startTouchY.current = e.touches[0].clientY;
                startTime.current = Date.now();
                setTouchHandledOnce(true); 
            }
        }
    };
    
    const handleTouchMove = (e) => {
        if (scrollAtTop && touchHandledOnce) {
            const currentY = e.touches[0].clientY;
            const deltaY = currentY - startTouchY.current;
    
            const newOffset = topOffset + deltaY;
            setTopOffset(Math.max(newOffset, 32));
    
            startTouchY.current = currentY;
        }
    };
    
    const handleTouchEnd = () => {
        if (scrollAtTop && touchHandledOnce) {
            const endTime = Date.now();
            const elapsedTime = endTime - startTime.current;
            const swipeDistance = topOffset - 32;
            const swipeVelocity = Math.abs(swipeDistance / elapsedTime);
    
            if (swipeVelocity > 0.5 || topOffset > window.innerHeight / 3) {
                onClose();
            } else {
                setAnimatingBack(true);
                setTopOffset(32);
                setTimeout(() => setAnimatingBack(false), 300);
            }
        }
    
        setTouchHandledOnce(false);
    };
    

    useEffect(() => {
        if (!isOpen) {
            setTopOffset(32);
            setScrollAtTop(false);
            setTouchHandledOnce(false);
        }
    }, [isOpen]);

    return (
        <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
            closeOnOverlayClick={true}
            w="full"
            maxW={96}
        >
            <DrawerOverlay />

            <DrawerContent
                ref={drawerRef}
                style={{
                    position: 'relative',
                    top: `${topOffset}px`,
                    transition: animatingBack ? 'top 0.3s ease' : 'none'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                w="container.md"
                borderTopRadius={26}
                backgroundColor={boxClr}
                h="calc(100% - 32px)"
            >
                <Center>
                    <Box
                        backgroundColor={textClr}
                        width={32}
                        height={2}
                        top={-4}
                        borderRadius={26}
                        pos="absolute"
                    />
                </Center>
                <Box
                    overflowY="auto"
                    overflowX="hidden"
                    position="relative"
                    borderTopRadius={26}
                    ref={contentRef}
                    onScroll={() => {
                        if (contentRef.current.scrollTop === 0) {
                            setScrollAtTop(true);
                        } else {
                            setScrollAtTop(false);
                            setTouchHandledOnce(false);
                        }
                    }}
                >
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
                                textAlign="center"
                                mb={4}
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

                            <Flex flexWrap="wrap" width="full" gap={6}>
                                {composition.map((item, index) => {
                                    return (
                                        <Box backgroundColor={colors[index]} flex="1" borderRadius={16} p={4}>
                                            <Image key={index} src={item} minW="60px" />
                                        </Box>
                                    );
                                })}
                            </Flex>
                        </Flex>
                    </Center>
                </Box>
            </DrawerContent>
        </Drawer>
    );
}
