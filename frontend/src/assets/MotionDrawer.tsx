import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    ReactElement,
    cloneElement,
} from 'react'
import { Drawer, Portal, Box } from '@chakra-ui/react'
import { DrawerContext } from '@/contexts/DrawerContext'

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
    const [potentialDrag, setPotentialDrag] = useState(false) // Новое состояние

    const contentRef = useRef<HTMLDivElement>(null)

    const isDraggingRef = useRef(isDragging)
    const potentialDragRef = useRef(potentialDrag)

    useEffect(() => {
        isDraggingRef.current = isDragging
        potentialDragRef.current = potentialDrag
    }, [isDragging, potentialDrag])

    const handleTouchStart = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            if (contentRef.current && contentRef.current.scrollTop === 0) {
                setPotentialDrag(true)
                const touch = e.touches[0]
                setStartY(touch.clientY)
                setStartTime(Date.now())

                const rect = contentRef.current.getBoundingClientRect()
                setDrawerHeight(rect.height)
            }
        },
        []
    )

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!e.touches[0]) return
            const touch = e.touches[0]

            if (potentialDragRef.current && !isDraggingRef.current) {
                const deltaY = touch.clientY - startY

                if (deltaY > 5) {
                    setIsDragging(true)
                    setPotentialDrag(false)
                    setOffset(deltaY)
                    e.preventDefault()
                } else if (deltaY < 0) {
                    setPotentialDrag(false)
                }
            }

            if (isDraggingRef.current) {
                const deltaY = touch.clientY - startY
                const newOffset = Math.max(0, deltaY)
                setOffset(newOffset)
                e.preventDefault()
            }
        },
        [startY]
    )

    const handleTouchEnd = useCallback(() => {
        if (isDraggingRef.current) {
            const endTime = Date.now()
            const duration = endTime - startTime
            const newVelocity = offset / (duration || 1)
            setVelocity(newVelocity)

            const shouldClose = offset > drawerHeight / 2 || newVelocity > 0.5
            if (shouldClose) setIsOpen(false)
        }

        setIsDragging(false)
        setPotentialDrag(false)
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
        <DrawerContext.Provider value={{ onClose: () => setIsOpen(false) }}>
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
                            opacity: 1 - Math.min(offset / drawerHeight, 1),
                            transition: 'opacity 0.2s ease',
                        }}
                    />
                    <Drawer.Positioner
                        padding="gap"
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
                            display="flex"
                            flexDirection="column"
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

                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '42px',
                                    overflow: 'hidden',
                                }}
                            >
                                {children}
                            </div>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </DrawerContext.Provider>
    )
}
