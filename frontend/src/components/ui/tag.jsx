import { Tag as ChakraTag } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Tag = forwardRef(function Tag(props, ref) {
  const {
    startElement,
    endElement,
    onClose,
    closable = !!onClose,
    children,
    ...rest
  } = props

  return (
    <ChakraTag.Root ref={ref} {...rest}>
      {startElement && (
        <ChakraTag.StartElement>{startElement}</ChakraTag.StartElement>
      )}
      <ChakraTag.Label>{children}</ChakraTag.Label>
      {endElement && <ChakraTag.EndElement>{endElement}</ChakraTag.EndElement>}
      {closable && (
        <ChakraTag.EndElement>
          <ChakraTag.CloseTrigger onClick={onClose} />
        </ChakraTag.EndElement>
      )}
    </ChakraTag.Root>
  )
})
