import { Alert as ChakraAlert } from '@chakra-ui/react'
import { CloseButton } from './close-button'
import { forwardRef } from 'react'

export const Alert = forwardRef(function Alert(props, ref) {
  const {
    title,
    children,
    icon,
    closable,
    onClose,
    startElement,
    endElement,
    ...rest
  } = props
  return (
    <ChakraAlert.Root ref={ref} {...rest}>
      {startElement || <ChakraAlert.Indicator>{icon}</ChakraAlert.Indicator>}
      {children ? (
        <ChakraAlert.Content>
          <ChakraAlert.Title>{title}</ChakraAlert.Title>
          <ChakraAlert.Description>{children}</ChakraAlert.Description>
        </ChakraAlert.Content>
      ) : (
        <ChakraAlert.Title flex='1'>{title}</ChakraAlert.Title>
      )}
      {endElement}
      {closable && (
        <CloseButton
          size='sm'
          pos='relative'
          top='-2'
          insetEnd='-2'
          alignSelf='flex-start'
          onClick={onClose}
        />
      )}
    </ChakraAlert.Root>
  )
})
