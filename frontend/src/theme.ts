import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react'

const config = defineConfig({
    globalCss: {
        body: {
            backgroundColor: 'back',
            color: 'text',
        },
        html: {
            scrollBehavior: 'smooth',
            scrollPaddingTop: '110px',
        },
    },
    theme: {
        tokens: {
            spacing: {
                gap: { value: '16px' },
            },
            sizes: {
                hb: { value: '32px' },
            },
            fonts: {
                heading: { value: 'Montserrat Variable' },
                body: { value: 'Montserrat Variable' },
            },
            colors: {
                'token-accent': { value: '#6ED209' },
                'token-black': { value: '#151613' },
                'token-second-black': { value: '#242522' },
                'token-black-card': { value: '#1D1E1C' },
                'token-white': { value: '#F5FFF7' },
                'token-second-white': { value: '#DFEEE2' },
                'token-white-card': { value: '#E6F2E8' },
            },
        },
        semanticTokens: {
            colors: {
                accent: {
                    value: {
                        base: '{colors.token-accent}',
                        _dark: '{colors.token-accent}',
                    },
                },
                gray: {
                    value: {
                        base: '{colors.token-second-white}',
                        _dark: '{colors.token-second-black}',
                    },
                },
                back: {
                    value: {
                        base: '{colors.token-white}',
                        _dark: '{colors.token-black}',
                    },
                },
                text: {
                    value: {
                        base: '{colors.token-black}',
                        _dark: '{colors.token-white}',
                    },
                },
                card: {
                    value: {
                        base: '{colors.token-white-card}',
                        _dark: '{colors.token-black-card}',
                    },
                },
            },
        },
    },
})

export const system = createSystem(defaultConfig, config)
