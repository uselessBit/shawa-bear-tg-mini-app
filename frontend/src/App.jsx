import {
    ChakraProvider,
    extendTheme,
    Box,
    useColorModeValue,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Menu from "./pages/Menu.jsx";
import Basket from "./pages/Basket.jsx";
import Profile from "./pages/Profile.jsx";

const theme = extendTheme({
    colors: {
        bgColor: {
            100: "#F9F9F9",
            900: "#252525",
        },
        boxColor: {
            100: "#FFFFFF",
            900: "#1A1A1A",
        },
        textColor: {
            100: "#252525",
            900: "#F9F9F9",
        },
    },
    shadows: {
        light: "5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 1)",
    },
});

export default function App() {
    const bgColor = useColorModeValue("bgColor.100", "bgColor.900");

    return (
        <ChakraProvider theme={theme}>
            <Box bg={bgColor} minHeight="100vh" w={"100%"}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Menu />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="basket" element={<Basket />} />
                        </Route>
                    </Routes>
                </Router>
            </Box>
        </ChakraProvider>
    );
}
