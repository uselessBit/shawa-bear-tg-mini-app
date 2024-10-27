import { Box, Steps as ChakraSteps } from '@chakra-ui/react'
import { LuCheck } from 'react-icons/lu'

export const StepsItem = (props) => {
  const { title, description, completedIcon, icon, ...rest } = props
  return (
    <ChakraSteps.Item {...rest}>
      <ChakraSteps.Trigger>
        <ChakraSteps.Indicator>
          <ChakraSteps.Status
            complete={completedIcon || <LuCheck />}
            incomplete={icon || <ChakraSteps.Number />}
          />
        </ChakraSteps.Indicator>
        <StepInfo title={title} description={description} />
      </ChakraSteps.Trigger>
      <ChakraSteps.Separator />
    </ChakraSteps.Item>
  )
}

const StepInfo = (props) => {
  const { title, description } = props
  if (title && description) {
    return (
      <Box>
        <ChakraSteps.Title>{title}</ChakraSteps.Title>
        <ChakraSteps.Description>{description}</ChakraSteps.Description>
      </Box>
    )
  }
  return (
    <>
      {title && <ChakraSteps.Title>{title}</ChakraSteps.Title>}
      {description && (
        <ChakraSteps.Description>{description}</ChakraSteps.Description>
      )}
    </>
  )
}

export const StepsIndicator = (props) => {
  const { icon = <ChakraSteps.Number />, completedIcon } = props
  return (
    <ChakraSteps.Indicator>
      <ChakraSteps.Status complete={completedIcon} incomplete={icon} />
    </ChakraSteps.Indicator>
  )
}

export const StepsList = ChakraSteps.List
export const StepsRoot = ChakraSteps.Root
export const StepsContent = ChakraSteps.Content
export const StepsCompletedContent = ChakraSteps.CompletedContent

export const StepsNextTrigger = (props) => {
  return <ChakraSteps.NextTrigger {...props} />
}

export const StepsPrevTrigger = (props) => {
  return <ChakraSteps.PrevTrigger {...props} />
}
