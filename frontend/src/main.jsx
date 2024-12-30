import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <ColorModeScript initialColorMode="dark"></ColorModeScript>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
