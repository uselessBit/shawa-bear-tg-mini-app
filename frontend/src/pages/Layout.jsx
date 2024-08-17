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
  Text,
  Avatar,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Input,
  ModalHeader
} from "@chakra-ui/react";
import { FaHome, FaShoppingBasket, FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios";

const Layout = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer state
  const { colorMode, toggleColorMode } = useColorMode(); // Color mode state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure(); // Modal state
  const location = useLocation();

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('https://127.0.0.1:8000/users/me');
      setIsAuthenticated(!!response.data);
    } catch (error) {
      console.error("Error fetching auth status:", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://127.0.0.1:8000/users/logout');
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Open modal if not authenticated and navigated to /profile
    if (location.pathname === "/profile" && !isAuthenticated) {
      onModalOpen();
    }
  }, [location, isAuthenticated, onModalOpen]);

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
            <Link to="/profile" onClick={onClose}>
              <Flex align="center" py={2}>
                <Icon as={FaRegUser} mr={2} />
                Profile
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

      {/* Modal for registration/login */}
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isAuthenticated ? "Welcome Back" : "Register"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isAuthenticated && (
              <>
                <Input placeholder="Email" mb={3} />
                <Input placeholder="Password" type="password" mb={3} />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {!isAuthenticated ? (
              <>
                <Button colorScheme="blue" mr={3} onClick={onModalClose}>
                  Register
                </Button>
                <Button variant="ghost" onClick={onModalClose}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

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
        <Link to="/profile">
          <Flex direction="column" align="center">
            <Icon as={FaRegUser} boxSize={6} />
            <Box fontSize="sm">Profile</Box>
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
