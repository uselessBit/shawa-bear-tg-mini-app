import {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode,
    useEffect,
} from 'react'
import { Ingredient, IngredientType, Step } from '@/types/Products'
import { ProductService } from '@/api/ProductService'

interface ConstructorContextType {
    currentStep: Step
    ingredients: Ingredient[]
    selectedItems: Partial<Record<IngredientType, Ingredient[]>>
    totalPrice: number
    goNext: () => void
    goBack: () => void
    selectItem: (item: Ingredient) => void
    direction: number
    ingredientsLoading: boolean
    ingredientsError: string | null
}

const ConstructorContext = createContext<ConstructorContextType>(
    {} as ConstructorContextType
)

const stepsOrder: Step[] = ['base', 'sauce', 'meat', 'extras', 'summary']

export const ConstructorProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<Step>('base')
    const [selectedItems, setSelectedItems] = useState<
        Partial<Record<IngredientType, Ingredient[]>>
    >({})
    const [direction, setDirection] = useState(1)

    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [ingredientsLoading, setIngredientsLoading] = useState(true)
    const [ingredientsError, setIngredientsError] = useState<string | null>(
        null
    )

    useEffect(() => {
        const loadIngredients = async () => {
            try {
                const data = await ProductService.fetchAllIngredients()

                const enrichedData = data.map((ingredient) => ({
                    ...ingredient,
                    color: ingredient.color || getDefaultColor(ingredient.type),
                    required: ingredient.required || ingredient.type === 'base',
                }))

                setIngredients(enrichedData)
            } catch (err) {
                setIngredientsError(
                    `Ошибка загрузки: ${err instanceof Error ? err.message : 'Unknown error'}`
                )
            } finally {
                setIngredientsLoading(false)
            }
        }

        loadIngredients()
    }, [])

    const totalPrice = useMemo(
        () =>
            Object.values(selectedItems)
                .flat()
                .reduce((sum, item) => sum + (item?.price || 0), 0),
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
        setSelectedItems((prev) => {
            const current = prev[item.type] || []

            if (item.type === 'base') {
                return { ...prev, [item.type]: [item] }
            }

            const existingIndex = current.findIndex(
                (i) => i.ingredient_id === item.ingredient_id
            )

            if (existingIndex !== -1) {
                const newArray = [...current]
                newArray.splice(existingIndex, 1)
                return { ...prev, [item.type]: newArray }
            } else {
                return { ...prev, [item.type]: [...current, item] }
            }
        })
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
                ingredientsLoading,
                ingredientsError,
            }}
        >
            {children}
        </ConstructorContext.Provider>
    )
}

export const useConstructor = () => useContext(ConstructorContext)

const getDefaultColor = (type: IngredientType): string => {
    const colors: Record<IngredientType, string> = {
        base: '#f0e6d2',
        sauce: '#fff5e6',
        meat: '#ffeb3b',
        extras: '#8bc34a',
    }
    return colors[type]
}
