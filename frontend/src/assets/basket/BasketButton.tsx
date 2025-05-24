import { Button, Icon } from '@chakra-ui/react'
import { IoBasket } from 'react-icons/io5'
import React from 'react'
import { useBasketContext } from '@/contexts/BasketContext'
import { motion, AnimatePresence } from 'framer-motion'

type BasketButtonProps = {
    onClick?: React.MouseEventHandler
    openBasketPage: () => void
}

const MotionButton = motion(Button)

export default function BasketButton({
    onClick,
    openBasketPage,
}: BasketButtonProps) {
    const { basket, loading } = useBasketContext()

    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        openBasketPage()
        onClick?.(event)
    }

    return (
        <AnimatePresence>
            {!loading && basket && basket.total_price > 0 && (
                <MotionButton
                    initial={{
                        y: 200,
                        opacity: 0,
                        scale: 0.7,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        y: 200,
                        opacity: 0,
                    }}
                    transition={{
                        type: 'tween',
                        duration: 0.35,
                        ease: 'easeOut',
                    }}
                    position="fixed"
                    bottom="gap"
                    right="gap"
                    rounded="full"
                    bg="accent"
                    color="text"
                    p="24px"
                    fontSize="xl"
                    fontWeight="700"
                    onClick={handleOnClick}
                >
                    <Icon as={IoBasket} boxSize={8} />
                    <motion.span
                        key={basket.total_price}
                        initial={{ scale: 0.5, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                        }}
                    >
                        {basket.total_price}p
                    </motion.span>
                </MotionButton>
            )}
        </AnimatePresence>
    )
}
