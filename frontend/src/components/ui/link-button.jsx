'use client'

import { createRecipeContext } from '@chakra-ui/react'

const { withContext } = createRecipeContext({ key: 'button' })

// Replace "a" with your framework's link component
export const LinkButton = withContext('a')
