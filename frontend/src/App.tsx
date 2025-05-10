import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { system } from './theme.ts'
import Header from './assets/header/Header.tsx'
import MainList from './assets/mainList/MainList.tsx'

export default function App() {
    const categories = ['Донеры', 'Бургеры', 'Десерты', 'Напитки']
    const [activeCategory, setActiveCategory] = useState(categories[0])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <ChakraProvider value={system}>
            <Header
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <MainList
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
        </ChakraProvider>
    )
}
