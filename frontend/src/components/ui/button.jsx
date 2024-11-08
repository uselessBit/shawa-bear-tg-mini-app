import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Button = forwardRef(function Button(props, ref) {
  const { loading, disabled, loadingText, children, ...rest } = props
  return (
    <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
      {loading && !loadingText ? (
        <>
          <AbsoluteCenter display='inline-flex'>
            <Spinner size='inherit' color='inherit' />
          </AbsoluteCenter>
          <Span opacity={0}>{children}</Span>
        </>
      ) : loading && loadingText ? (
        <>
          <Spinner size='inherit' color='inherit' />
          {loadingText}
        </>
      ) : (
        children
      )}
    </ChakraButton>
  )
})
