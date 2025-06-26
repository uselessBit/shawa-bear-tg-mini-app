import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from 'react'
import { OrderService } from '@/api/OrderService'
import { PaymentOption } from '@/types/Basket'
import { Basket } from '@/types/Basket'
import { toaster } from '@/components/ui/toaster.tsx'

type OrderFormState = {
    firstName: string
    phone: string
    comment: string
    address: string
    timeTaken: string
    paymentOption: PaymentOption
    useCoins: boolean
    discount: number
}

type OrderContextType = {
    formState: OrderFormState
    errors: Record<string, string>
    isSubmitting: boolean
    submitError: string | null
    isSuccess: boolean
    updateField: (
        field: keyof OrderFormState,
        value: string | boolean | number
    ) => void
    updateSelectField: (field: keyof OrderFormState, value: string[]) => void
    submitOrder: (basket: Basket) => Promise<boolean>
    resetForm: () => void
    virtualCoins: number
    setVirtualCoins: (coins: number) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({
    children,
    userId,
}: {
    children: ReactNode
    userId: number
}) => {
    const [formState, setFormState] = useState<OrderFormState>({
        firstName: '',
        phone: '',
        comment: '',
        address: '',
        timeTaken: '',
        paymentOption: 'cash',
        useCoins: false,
        discount: 0,
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {}
        let hasEmptyFields = false

        const requiredFields: Array<keyof OrderFormState> = [
            'firstName',
            'phone',
            'address',
            'timeTaken',
            'paymentOption',
        ]

        requiredFields.forEach((field) => {
            if (!formState[field]) {
                newErrors[field] = 'Обязательное поле'
                hasEmptyFields = true
            }
        })

        if (hasEmptyFields) {
            setErrors(newErrors)
            toaster.create({
                description: 'Заполните все обязательные поля',
                type: 'error',
            })
            return false
        }

        let hasFormatErrors = false

        if (!formState.phone.match(/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/)) {
            newErrors.phone = 'Некорректный номер телефона'
            hasFormatErrors = true
        }

        if (hasFormatErrors) {
            setErrors(newErrors)
            toaster.create({
                description: 'Исправьте ошибки в полях',
                type: 'error',
            })
            return false
        }

        setErrors({})
        return true
    }, [formState])

    const updateField = useCallback(
        (field: keyof OrderFormState, value: string | boolean | number) => {
            setFormState((prev) => ({
                ...prev,
                [field]: value,
            }))
            setErrors((prev) => ({ ...prev, [field]: '' }))
        },
        []
    )

    const [virtualCoins, setVirtualCoins] = useState(0)

    const updateSelectField = useCallback(
        (field: keyof OrderFormState, value: string[]) => {
            updateField(field, value[0] || '')
        },
        [updateField]
    )

    const submitOrder = useCallback(
        async (basket: Basket) => {
            if (!basket?.basket_id) {
                setSubmitError('Некорректная корзина')
                return false
            }

            if (!validateForm()) {
                setSubmitError('Заполните обязательные поля')
                return false
            }

            setIsSubmitting(true)
            setSubmitError(null)
            setIsSuccess(false)

            try {
                const minutes = formState.timeTaken.padStart(2, '0')
                const timeTakenFormatted = `00:${minutes}:00`

                await OrderService.createOrder(userId, {
                    basket_id: basket.basket_id,
                    payment_option: formState.paymentOption,
                    time_taken: timeTakenFormatted,
                    comment: formState.comment,
                    status: 'created',
                    first_name: formState.firstName,
                    address: formState.address,
                    phone: formState.phone,
                    discount: formState.discount,
                })

                setIsSuccess(true)
                return true
            } catch (error) {
                setSubmitError('Ошибка при оформлении заказа')
                console.error('Order error:', error)
                return false
            } finally {
                setIsSubmitting(false)
            }
        },
        [formState, validateForm, userId]
    )

    const resetForm = useCallback(() => {
        setFormState({
            firstName: '',
            phone: '',
            comment: '',
            address: '',
            timeTaken: '',
            paymentOption: 'cash',
            useCoins: false,
            discount: 0,
        })
        setErrors({})
        setSubmitError(null)
        setIsSuccess(false)
    }, [])

    return (
        <OrderContext.Provider
            value={{
                formState,
                errors,
                isSubmitting,
                submitError,
                isSuccess,
                updateField,
                updateSelectField,
                submitOrder,
                resetForm,
                virtualCoins,
                setVirtualCoins,
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error('useOrder must be used within a OrderProvider')
    }
    return context
}
