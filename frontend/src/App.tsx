import { ChakraProvider, Box } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'
import { system } from './theme.ts'

export default function App() {
    return (
        <ChakraProvider value={system}>
            <Box bg="back" color="text" p={4}>
                <ColorModeButton />
            </Box>
        </ChakraProvider>
    )
}
