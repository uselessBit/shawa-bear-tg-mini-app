import { AnimatePresence } from 'framer-motion'
import { useConstructor } from '@/contexts/ConstructorContext'
import {
    SelectBase,
    SelectSauce,
    SelectMeat,
    SelectExtras,
    Summary,
} from './components'
import { motion } from 'framer-motion'

const MotionStep = motion.div

export const ShawarmaConstructorContent = () => {
    const { currentStep, direction } = useConstructor()

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0.5,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            },
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2 },
        }),
    }

    const getStepComponent = () => {
        switch (currentStep) {
            case 'base':
                return <SelectBase key="base" />
            case 'sauce':
                return <SelectSauce key="sauce" />
            case 'meat':
                return <SelectMeat key="meat" />
            case 'extras':
                return <SelectExtras key="extras" />
            case 'summary':
                return <Summary key="summary" />
            default:
                return null
        }
    }

    return (
        <div
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
            }}
        >
            <AnimatePresence mode="popLayout" custom={direction}>
                <MotionStep
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                    }}
                >
                    {getStepComponent()}
                </MotionStep>
            </AnimatePresence>
        </div>
    )
}
