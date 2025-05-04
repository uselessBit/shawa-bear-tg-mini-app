import { ChakraProvider } from '@chakra-ui/react'
// import { ColorModeButton } from '@/components/ui/color-mode'
import { system } from './theme.ts'
import Header from './assets/header/Header.tsx'
import MainList from './assets/mainList/MainList.tsx'

export default function App() {
    return (
        <ChakraProvider value={system}>
            <Header />
            {/*<Box color="text" p={4}>*/}
            {/*    <ColorModeButton />*/}
            {/*</Box>*/}
            <MainList />
        </ChakraProvider>
    )
}
