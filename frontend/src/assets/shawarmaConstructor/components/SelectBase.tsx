import { StepWrapper } from './StepWrapper'
import { NavigationButtons } from './NavigationButtons'

export const SelectBase = () => {
    return (
        <StepWrapper title="Выберите основу">
            <NavigationButtons />
        </StepWrapper>
    )
}
