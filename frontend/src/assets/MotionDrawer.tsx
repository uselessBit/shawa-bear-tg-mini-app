import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    ReactElement,
    cloneElement,
} from 'react'
import { Drawer, Portal, Box } from '@chakra-ui/react'

type MotionDrawerProps = {
    trigger: ReactElement<{ onClick?: React.MouseEventHandler }>
    children?: React.ReactNode
}

export default function MotionDrawer({ trigger, children }: MotionDrawerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [offset, setOffset] = useState(0)
    const [startY, setStartY] = useState(0)
    const [drawerHeight, setDrawerHeight] = useState(0)
    const [startTime, setStartTime] = useState(0)
    const [velocity, setVelocity] = useState(0)

    const contentRef = useRef<HTMLDivElement>(null)

    const handleTouchStart = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            setIsDragging(true)
            const touch = e.touches[0]
            setStartY(touch.clientY)
            setStartTime(Date.now())

            if (contentRef.current) {
                const rect = contentRef.current.getBoundingClientRect()
                setDrawerHeight(rect.height)
            }
        },
        []
    )

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!isDragging || !e.touches[0]) return

            const touch = e.touches[0]
            const deltaY = touch.clientY - startY
            const newOffset = Math.max(0, deltaY)

            setOffset(newOffset)
            e.preventDefault()
        },
        [isDragging, startY]
    )

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false)
        const endTime = Date.now()
        const duration = endTime - startTime

        const newVelocity = offset / (duration || 1)
        setVelocity(newVelocity)

        const shouldClose = offset > drawerHeight / 2 || newVelocity > 0.5

        if (shouldClose) setIsOpen(false)

        setOffset(0)
    }, [offset, drawerHeight, startTime])

    useEffect(() => {
        document.addEventListener('touchmove', handleTouchMove, {
            passive: false,
        })
        document.addEventListener('touchend', handleTouchEnd)
        document.addEventListener('touchcancel', handleTouchEnd)

        return () => {
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleTouchEnd)
            document.removeEventListener('touchcancel', handleTouchEnd)
        }
    }, [handleTouchMove, handleTouchEnd])

    return (
        <Drawer.Root placement="bottom" open={isOpen}>
            <Drawer.Trigger asChild>
                {cloneElement(trigger, {
                    onClick: (e: React.MouseEvent) => {
                        trigger.props.onClick?.(e)
                        setIsOpen(true)
                    },
                })}
            </Drawer.Trigger>

            <Portal>
                <Drawer.Backdrop
                    bg="back/90"
                    backdropFilter="blur(8px)"
                    style={{
                        opacity:
                            1 - Math.min(offset / (drawerHeight * 0.7), 1) <= 0
                                ? '0'
                                : 1 -
                                  Math.min(offset / (drawerHeight * 0.7), 1),
                        transition: 'opacity 0.2s ease',
                    }}
                />
                <Drawer.Positioner
                    padding="24px"
                    style={{
                        transform: `translateY(${offset}px)`,
                        transition: isDragging
                            ? 'none'
                            : `transform ${velocity > 0.5 ? 0.2 : 0.3}s cubic-bezier(0.33, 1, 0.68, 1)`,
                    }}
                    onTouchStart={handleTouchStart}
                >
                    <Drawer.Content
                        ref={contentRef}
                        h="calc(100% - 32px)"
                        rounded="42px"
                        bg="card"
                        shadow="none"
                        touchAction="none"
                    >
                        <Box
                            bg="text"
                            w="100px"
                            h="5px"
                            rounded="full"
                            position="absolute"
                            top="-16px"
                            left="50%"
                            transform="translateX(-50%)"
                        />

                        {children}
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}
