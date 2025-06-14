import { createContext, useContext, useEffect, useState } from 'react'
import { UserService, User, OrderHistory } from '@/api/UserService'

type UserContextType = {
    user: User | null
    orderHistory: OrderHistory[]
    loading: boolean
    error: string | null
    refreshUser: () => void
    refreshOrderHistory: () => void
}

const UserContext = createContext<UserContextType>({
    user: null,
    orderHistory: [],
    loading: true,
    error: null,
    refreshUser: () => {},
    refreshOrderHistory: () => {},
})

export const UserProvider = ({
    children,
    userId,
}: {
    children: React.ReactNode
    userId: number
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUser = async () => {
        setLoading(true)
        try {
            const userData = await UserService.getUserById(userId)
            setUser(userData)
            setError(null)
        } catch (err) {
            setError('Не удалось загрузить данные пользователя')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchOrderHistory = async () => {
        setLoading(true)
        try {
            const history = await UserService.getOrderHistory(userId)
            setOrderHistory(history)
            setError(null)
        } catch (err) {
            setError('Не удалось загрузить историю заказов')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userId) {
            fetchUser()
            fetchOrderHistory()
        }
    }, [userId])

    const refreshUser = () => {
        fetchUser()
    }

    const refreshOrderHistory = () => {
        fetchOrderHistory()
    }

    return (
        <UserContext.Provider
            value={{
                user,
                orderHistory,
                loading,
                error,
                refreshUser,
                refreshOrderHistory,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)
