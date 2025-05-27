import { Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useConstructor } from '@/contexts/ConstructorContext'
import { Step } from '@/types/Products'

const MotionFlex = motion(Flex)

export const NavigationButtons = () => {
    const { goNext, goBack, currentStep, selectedItems } = useConstructor()

    const isFirstStep = currentStep === 'base'
    const isLastStep = currentStep === 'summary'

    const isStepValid = () => {
        if (currentStep === 'summary') return true
        return Boolean(selectedItems[currentStep as Exclude<Step, 'summary'>])
    }

    const getMainButtonText = () => {
        if (isLastStep) return 'В корзину'
        return 'Далее'
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
        >
            {!isFirstStep && (
                <Button
                    flex="1"
                    h="56px"
                    onClick={goBack}
                    variant="outline"
                    borderWidth="2px"
                    borderRadius="full"
                    fontSize="lg"
                    fontWeight="700"
                    _hover={{
                        transform: 'scale(1.05)',
                        borderColor: 'gray',
                    }}
                    transition="all 0.2s"
                >
                    Назад
                </Button>
            )}

            <Button
                flex="1"
                h="56px"
                onClick={goNext}
                bg="bg"
                color="text"
                borderRadius="full"
                fontSize="lg"
                fontWeight="700"
                disabled={!isStepValid()}
                _hover={{
                    transform: 'scale(1.05)',
                    filter: 'brightness(1.1)',
                }}
                _disabled={{
                    opacity: 0.7,
                    cursor: 'not-allowed',
                    _hover: { transform: 'none' },
                }}
                transition="all 0.2s"
            >
                {getMainButtonText()}
            </Button>
        </MotionFlex>
    )
}
