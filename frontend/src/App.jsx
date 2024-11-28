import React from "react";
import { ChakraProvider, Box, useColorModeValue } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import theme from "./theme";

export default function App() {
    const bgColor = useColorModeValue("bgColor.100", "bgColor.900");

    return (
        <ChakraProvider theme={theme}>
            <Box
                bg={bgColor}
                minHeight="100vh"
                w={"100%"}
                fontFamily="Montserrat"
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />} />
                    </Routes>
                </Router>
            </Box>
        </ChakraProvider>
    );
}
