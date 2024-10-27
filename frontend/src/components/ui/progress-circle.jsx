import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export const ProgressCircleRoot = ChakraProgressCircle.Root

export const ProgressCircleRing = forwardRef(
  function ProgressCircleRing(props, ref) {
    const { trackColor, cap, color, ...rest } = props
    return (
      <ChakraProgressCircle.Circle {...rest} ref={ref}>
        <ChakraProgressCircle.Track stroke={trackColor} />
        <ChakraProgressCircle.Range stroke={color} strokeLinecap={cap} />
      </ChakraProgressCircle.Circle>
    )
  },
)

export const ProgressCircleValueText = forwardRef(
  function ProgressCircleValueText(props, ref) {
    return (
      <AbsoluteCenter>
        <ChakraProgressCircle.ValueText {...props} ref={ref} />
      </AbsoluteCenter>
    )
  },
)
