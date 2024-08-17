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
} from "@chakra-ui/react";
import { FaHome, FaShoppingBasket, FaBars } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios";

const Layout = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer state
  const { colorMode, toggleColorMode } = useColorMode(); // Color mode state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const location = useLocation();

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" pb={16}>
      <Flex as="header" align="center" justify="space-between" p={1} bg={bgColor} boxShadow="md" zIndex="overlay">
        <IconButton
          icon={<FaBars />}
          onClick={onOpen}
          aria-label="Open menu"
          variant="ghost"
          color={textColor}
          size="sm"
          mr={2}
          _hover={{ bg: "transparent" }}
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

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor} color={textColor}>
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
