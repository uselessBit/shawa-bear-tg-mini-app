declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initDataUnsafe: {
                    user?: {
                        id: number
                        first_name?: string
                        last_name?: string
                        username?: string
                        language_code?: string
                        is_premium?: boolean
                    }
                }
            }
        }
    }
}

export {}
