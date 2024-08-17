import {ChakraProvider, Box, Flex, IconButton, Text, VStack} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaInfoCircle, FaUser } from 'react-icons/fa';
import Layout from "./pages/Layout.jsx";
import Menu from "./pages/Menu.jsx"
import About from "./pages/About.jsx"
import Basket from "./pages/Basket.jsx"
import Profile from "./pages/Profile.jsx";


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="profile" element={<Profile />} />
          <Route path="basket" element={<Basket />} />
          {/*<Route path="*" element={<NoPage />} />*/}
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
