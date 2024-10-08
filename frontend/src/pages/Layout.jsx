import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { FaHome, FaShoppingBasket, FaBars } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios";

const Layout = () => {
  const bgColor = useColorModeValue("#F9F9F9", "#252525");
  const boxColor = useColorModeValue("#FFFFFF", "#1A1A1A");
  const textColor = useColorModeValue("#252525", "#F9F9F9");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer state
  const { colorMode, toggleColorMode } = useColorMode(); // Color mode state

  return (
    <Box bg={boxColor} color={textColor} minH="100vh" pb={16}>
      <Center>
        <Flex as="header" align="center" justify="space-between" p="10px" bg={bgColor} boxShadow="md" zIndex="overlay" w="90%" borderRadius="13px" m="5vw 0 0 0">
          <IconButton
            icon={<Icon>
                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.54884" cy="6.95338" r="5.95338" stroke={textColor} stroke-width="2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3647 20.3222C16.8416 20.0409 16.9868 19.424 16.6693 18.9704C14.8665 16.394 11.8768 14.7091 8.4936 14.7091C5.11041 14.7091 2.12074 16.394 0.317891 18.9704C0.000446367 19.424 0.145615 20.0409 0.622483 20.3222V20.3222C1.11463 20.6126 1.73499 20.4134 2.07419 19.9536C3.52577 17.9856 5.86061 16.7091 8.4936 16.7091C11.1266 16.7091 13.4614 17.9856 14.913 19.9536C15.2522 20.4134 15.8726 20.6126 16.3647 20.3222V20.3222Z" fill={textColor}/>
                    </svg>
            </Icon>}
            onClick={onOpen}
            variant="ghost"
          />
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle theme"
            variant="ghost"
            color={textColor}
            size="sm"
            _hover={{ bg: "transparent" }}
          />
        </Flex>
      </Center>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={boxColor} color={textColor}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Link to="/" onClick={onClose}>
              <Flex align="center" py={2}>
                <Icon as={FaHome} mr={2} />
                Menu
              </Flex>
            </Link>
            <Link to="/basket" onClick={onClose}>
              <Flex align="center" py={2}>
                <Icon as={FaShoppingBasket} mr={2} />
                Basket
              </Flex>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>



      <Box pt={6}>
        <Outlet />
      </Box>

      <Flex
        as="nav"
        justify="space-around"
        pos="fixed"
        bottom="0"
        left="0"
        right="0"
        width="100%"
        bg={bgColor}
        p={2}
        boxShadow="0 -1px 5px rgba(0, 0, 0, 0.1)"
      >
        <Link to="/">
          <Flex direction="column" align="center">
            <Icon as={FaHome} boxSize={6} />
            <Box fontSize="sm">Menu</Box>
          </Flex>
        </Link>
        <Link to="/basket">
          <Flex direction="column" align="center">
            <Icon as={FaShoppingBasket} boxSize={6} />
            <Box fontSize="sm">Basket</Box>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};

export default Layout;
