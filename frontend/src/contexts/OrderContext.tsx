import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
    useEffect,
} from 'react'
import { OrderService } from '@/api/OrderService'
import { PaymentOption } from '@/types/Basket'
import { useBasketContext } from '@/contexts/BasketContext'
import { Basket } from '@/types/Basket'

type OrderFormState = {
    firstName: string
    phone: string
    comment: string
    address: string
    timeTaken: string
    paymentOption: PaymentOption
}

type OrderContextType = {
    formState: OrderFormState
    errors: Record<string, string>
    isSubmitting: boolean
    submitError: string | null
    isSuccess: boolean
    updateField: (field: keyof OrderFormState, value: string) => void
    updateSelectField: (field: keyof OrderFormState, value: string[]) => void
    submitOrder: (basket: Basket) => Promise<boolean>
    resetForm: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const { basket } = useBasketContext()
    const [formState, setFormState] = useState<OrderFormState>({
        firstName: '',
        phone: '',
        comment: '',
        address: '',
        timeTaken: '30',
        paymentOption: 'cash',
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {}

        if (!formState.firstName.trim()) {
            newErrors.firstName = 'Введите имя'
        }

        if (!formState.phone.match(/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/)) {
            newErrors.phone = 'Некорректный номер телефона'
        }

        if (!formState.address) {
            newErrors.address = 'Выберите адрес'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formState])

    const updateField = useCallback(
        (field: keyof OrderFormState, value: string) => {
            setFormState((prev) => ({
                ...prev,
                [field]: value,
            }))
            setErrors((prev) => ({ ...prev, [field]: '' }))
        },
        []
    )

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
                await OrderService.createOrder({
                    basket_id: basket.basket_id,
                    payment_option: formState.paymentOption,
                    time_taken: formState.timeTaken,
                    comment: formState.comment,
                    status: 'created',
                    first_name: formState.firstName,
                    address: formState.address,
                    phone: formState.phone,
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
        [formState, validateForm]
    )

    const resetForm = useCallback(() => {
        setFormState({
            firstName: '',
            phone: '',
            comment: '',
            address: '',
            timeTaken: '30',
            paymentOption: 'cash',
        })
        setErrors({})
        setSubmitError(null)
        setIsSuccess(false)
    }, [])

    useEffect(() => {
        console.log('Form data updated:', formState)
        console.log(basket)
    }, [formState])

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
