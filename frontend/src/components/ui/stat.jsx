import {
  Badge,
  Stat as ChakraStat,
  FormatNumber,
  IconButton,
} from '@chakra-ui/react'
import { ToggleTip } from './toggle-tip'
import { forwardRef } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi'

export const StatLabel = forwardRef(function StatLabel(props, ref) {
  const { info, children, ...rest } = props
  return (
    <ChakraStat.Label {...rest} ref={ref}>
      {children}
      {info && (
        <ToggleTip content={info}>
          <IconButton variant='ghost' aria-label='info' size='2xs'>
            <HiOutlineInformationCircle />
          </IconButton>
        </ToggleTip>
      )}
    </ChakraStat.Label>
  )
})

export const StatValueText = forwardRef(function StatValueText(props, ref) {
  const { value, formatOptions, children, ...rest } = props
  return (
    <ChakraStat.ValueText {...rest} ref={ref}>
      {children ||
        (value != null && <FormatNumber value={value} {...formatOptions} />)}
    </ChakraStat.ValueText>
  )
})

export const StatUpTrend = forwardRef(function StatUpTrend(props, ref) {
  return (
    <Badge colorPalette='green' gap='0' {...props} ref={ref}>
      <ChakraStat.UpIndicator />
      {props.children}
    </Badge>
  )
})

export const StatDownTrend = forwardRef(function StatDownTrend(props, ref) {
  return (
    <Badge colorPalette='red' gap='0' {...props} ref={ref}>
      <ChakraStat.DownIndicator />
      {props.children}
    </Badge>
  )
})

export const StatRoot = ChakraStat.Root
export const StatHelpText = ChakraStat.HelpText
export const StatValueUnit = ChakraStat.ValueUnit
