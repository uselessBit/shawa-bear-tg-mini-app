import { Provider } from '@/components/ui/provider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource-variable/montserrat/index.css'

const getTelegramUserId = (): number => {
    try {
        const tg = window.Telegram?.WebApp
        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            return tg.initDataUnsafe.user.id
        }
    } catch (e) {
        console.error('Error accessing Telegram API:', e)
    }
    return 0
}

const userId = getTelegramUserId()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <App userId={userId} />
        </Provider>
    </React.StrictMode>
)
