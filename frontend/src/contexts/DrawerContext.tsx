import { createContext, useContext } from 'react'

type DrawerContextType = {
    onClose: () => void
}

export const DrawerContext = createContext<DrawerContextType>({
    onClose: () => {},
})

export const useDrawer = () => useContext(DrawerContext)
