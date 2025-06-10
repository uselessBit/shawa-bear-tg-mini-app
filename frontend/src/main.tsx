import { Provider } from '@/components/ui/provider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource-variable/montserrat/index.css'

if (import.meta.env.DEV) {
    if (!window.Telegram) {
        window.Telegram = {
            WebApp: {
                initDataUnsafe: {
                    user: {
                        id: 123456789,
                        first_name: 'TestUser',
                        username: 'test_user',
                    },
                },
            },
        }
        console.log('Mock Telegram WebApp data injected', window.Telegram)
    }
}

const getTelegramUserId = (): number => {
    const webApp = (window as any).Telegram?.WebApp as any
    return webApp?.initDataUnsafe?.user?.id || 0
}

const userId = getTelegramUserId()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <App userId={userId} />
        </Provider>
    </React.StrictMode>
)
