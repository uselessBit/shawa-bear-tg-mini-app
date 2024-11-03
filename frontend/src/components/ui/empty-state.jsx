import { EmptyState as ChakraEmptyState, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const EmptyState = forwardRef(function EmptyState(props, ref) {
  const { title, description, icon, children, ...rest } = props
  return (
    <ChakraEmptyState.Root ref={ref} {...rest}>
      <ChakraEmptyState.Content>
        {icon && (
          <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>
        )}
        {description ? (
          <VStack textAlign='center'>
            <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
            <ChakraEmptyState.Description>
              {description}
            </ChakraEmptyState.Description>
          </VStack>
        ) : (
          <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
        )}
        {children}
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  )
})
