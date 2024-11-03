import { Skeleton as ChakraSkeleton, Circle, Stack } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const SkeletonCircle = (props) => {
  const { size, ...rest } = props
  return (
    <Circle size={size} asChild>
      <ChakraSkeleton {...rest} />
    </Circle>
  )
}

export const SkeletonText = forwardRef(function SkeletonText(props, ref) {
  const { noOfLines = 3, gap, ...rest } = props
  return (
    <Stack gap={gap} width='full' ref={ref}>
      {Array.from({ length: noOfLines }).map((_, index) => (
        <ChakraSkeleton
          height='4'
          key={index}
          {...props}
          _last={{ maxW: '80%' }}
          {...rest}
        />
      ))}
    </Stack>
  )
})

export const Skeleton = ChakraSkeleton
