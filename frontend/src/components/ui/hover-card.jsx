import { HoverCard, Portal } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const HoverCardContent = forwardRef(
  function HoverCardContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <HoverCard.Positioner>
          <HoverCard.Content ref={ref} {...rest} />
        </HoverCard.Positioner>
      </Portal>
    )
  },
)

export const HoverCardArrow = forwardRef(function HoverCardArrow(props, ref) {
  return (
    <HoverCard.Arrow ref={ref} {...props}>
      <HoverCard.ArrowTip />
    </HoverCard.Arrow>
  )
})

export const HoverCardRoot = HoverCard.Root
export const HoverCardTrigger = HoverCard.Trigger
