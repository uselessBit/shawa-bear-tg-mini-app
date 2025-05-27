import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { Ingredient, IngredientType, Step } from '@/types/Products'

interface ConstructorContextType {
    currentStep: Step
    ingredients: Ingredient[]
    selectedItems: Partial<Record<IngredientType, Ingredient>>
    totalPrice: number
    goNext: () => void
    goBack: () => void
    selectItem: (item: Ingredient) => void
    direction: number
}

const ConstructorContext = createContext<ConstructorContextType>(
    {} as ConstructorContextType
)

const stepsOrder: Step[] = ['base', 'sauce', 'meat', 'extras', 'summary']

export const ConstructorProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<Step>('base')
    const [selectedItems, setSelectedItems] = useState<
        Partial<Record<IngredientType, Ingredient>>
    >({})
    const [direction, setDirection] = useState(1)

    const [ingredients] = useState<Ingredient[]>([
        // Основа (base)
        {
            ingredient_id: 1,
            name: 'Тонкий лаваш',
            type: 'base',
            price: 50,
            color: '#f0e6d2',
            required: true,
        },
        {
            ingredient_id: 2,
            name: 'Арабская пита',
            type: 'base',
            price: 70,
            color: '#e2d3c3',
        },

        // Соусы (sauce)
        {
            ingredient_id: 3,
            name: 'Классический соус',
            type: 'sauce',
            price: 30,
            color: '#fff5e6',
        },
        {
            ingredient_id: 4,
            name: 'Острый соус',
            type: 'sauce',
            price: 35,
            color: '#ffd1d1',
        },

        // Мясо (meat)
        {
            ingredient_id: 5,
            name: 'Курица гриль',
            type: 'meat',
            price: 80,
            color: '#ffeb3b',
            image_url: '/images/chicken.jpg',
        },
        {
            ingredient_id: 6,
            name: 'Говядина',
            type: 'meat',
            price: 100,
            color: '#ff5722',
            image_url: '/images/beef.jpg',
        },

        // Дополнительно (extras)
        {
            ingredient_id: 7,
            name: 'Овощи гриль',
            type: 'extras',
            price: 40,
            color: '#8bc34a',
            image_url: '/images/grilled-veggies.jpg',
        },
        {
            ingredient_id: 8,
            name: 'Сырный соус',
            type: 'extras',
            price: 45,
            color: '#fff9c4',
            image_url: '/images/cheese-sauce.jpg',
        },

        // Дополнительные примеры для демонстрации
        {
            ingredient_id: 9,
            name: 'Бекон',
            type: 'meat',
            price: 90,
            color: '#d84315',
            image_url: '/images/bacon.jpg',
        },
        {
            ingredient_id: 10,
            name: 'Грибы',
            type: 'extras',
            price: 35,
            color: '#bcaaa4',
            image_url: '/images/mushrooms.jpg',
        },
    ])

    const totalPrice = useMemo(
        () =>
            Object.values(selectedItems).reduce(
                (sum, item) => sum + (item?.price || 0),
                0
            ),
        [selectedItems]
    )

    const goNext = () => {
        const currentIndex = stepsOrder.indexOf(currentStep)
        setDirection(1)
        if (currentIndex < stepsOrder.length - 1) {
            setCurrentStep(stepsOrder[currentIndex + 1])
        }
    }

    const goBack = () => {
        const currentIndex = stepsOrder.indexOf(currentStep)
        setDirection(-1)
        if (currentIndex > 0) {
            setCurrentStep(stepsOrder[currentIndex - 1])
        }
    }

    const selectItem = (item: Ingredient) => {
        setSelectedItems((prev) => ({
            ...prev,
            [item.type]: item,
        }))
    }

    return (
        <ConstructorContext.Provider
            value={{
                currentStep,
                ingredients,
                selectedItems,
                totalPrice,
                goNext,
                goBack,
                selectItem,
                direction,
            }}
        >
            {children}
        </ConstructorContext.Provider>
    )
}

export const useConstructor = () => useContext(ConstructorContext)
