function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs
  } else {
    return rhsFn()
  }
}
import { IconButton as ChakraIconButton } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { LuX } from 'react-icons/lu'

export const CloseButton = forwardRef(function CloseButton(props, ref) {
  return (
    <ChakraIconButton variant='ghost' aria-label='Close' ref={ref} {...props}>
      {_nullishCoalesce(props.children, () => (
        <LuX />
      ))}
    </ChakraIconButton>
  )
})
