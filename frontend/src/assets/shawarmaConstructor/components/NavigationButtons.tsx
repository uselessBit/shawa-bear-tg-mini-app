import { Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useConstructor } from '@/contexts/ConstructorContext'

const MotionFlex = motion(Flex)

interface NavigationButtonsProps {
    onAddToBasket?: () => void
}

export const NavigationButtons = ({
    onAddToBasket,
}: NavigationButtonsProps) => {
    const { goNext, goBack, currentStep, selectedItems } = useConstructor()

    const isFirstStep = currentStep === 'base'
    const isLastStep = currentStep === 'summary'

    const isStepValid = () => {
        if (currentStep === 'summary') return true

        if (currentStep === 'base') {
            return Boolean(selectedItems.base?.length)
        }

        return true
    }

    const getMainButtonText = () => {
        if (isLastStep) return 'В корзину'
        return 'Далее'
    }

    const handleMainButtonClick = () => {
        if (isLastStep && onAddToBasket) {
            onAddToBasket()
        } else {
            goNext()
        }
    }

    return (
        <MotionFlex
            gap="12px"
            justify="center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            pos="absolute"
            bottom="0"
            left="0"
            w="full"
            bg="card"
            pt="12px"
        >
            {!isFirstStep && (
                <Button
                    flex="1"
                    h="48px"
                    onClick={goBack}
                    variant="outline"
                    borderWidth="2px"
                    borderRadius="full"
                    fontSize="md"
                    fontWeight="700"
                    transition="all 0.2s"
                >
                    Назад
                </Button>
            )}

            <Button
                flex="1"
                h="48px"
                bg="accent"
                color="text"
                borderRadius="full"
                fontSize="md"
                fontWeight="700"
                disabled={!isStepValid()}
                _disabled={{
                    opacity: 0.5,
                    cursor: 'not-allowed',
                }}
                transition="all 0.2s"
                onClick={handleMainButtonClick}
            >
                {getMainButtonText()}
            </Button>
        </MotionFlex>
    )
}
