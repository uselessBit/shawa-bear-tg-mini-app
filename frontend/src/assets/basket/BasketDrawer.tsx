import { AnimatePresence } from 'framer-motion'
import { BasketPage } from './basketPage/BasketPage'
import { ConfirmOrderPage } from './confirmOrderPage/ConfirmOrderPage'

export const BasketDrawerContent = ({
    confirmActive,
    handleBack,
    handleConfirm,
}: {
    confirmActive: boolean
    handleBack: () => void
    handleConfirm: () => void
}) => {
    return (
        <AnimatePresence mode="wait">
            {confirmActive ? (
                <>
                    <ConfirmOrderPage.Header
                        key="confirm-header"
                        onBack={handleBack}
                    />
                    <ConfirmOrderPage.Body key="confirm-body" />
                    <ConfirmOrderPage.Footer key="confirm-footer" />
                </>
            ) : (
                <>
                    <BasketPage.Header key="basket-header" />
                    <BasketPage.Body key="basket-body" />
                    <BasketPage.Footer
                        key="basket-footer"
                        openConfirm={handleConfirm}
                    />
                </>
            )}
        </AnimatePresence>
    )
}
