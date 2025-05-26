import { Portal, Select, createListCollection, Flex } from '@chakra-ui/react'
import React from 'react'

type CustomSelectProps = {
    options: Array<{ label: string; value: string; icon?: React.ReactNode }>
    placeholder: string
    value: string[]
    setValue: (value: string[]) => void
    isInvalid: boolean
}

export default function CustomSelect({
    options,
    placeholder,
    value,
    setValue,
    isInvalid,
}: CustomSelectProps) {
    const collection = createListCollection({ items: options })

    return (
        <Select.Root
            collection={collection}
            size="lg"
            width="full"
            bg="back"
            rounded="full"
            borderColor={isInvalid ? 'red.500' : 'back'}
            borderWidth="1px"
            value={value}
            onValueChange={(e) => setValue(e.value)}
        >
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger borderWidth="0" py="16px" px="24px">
                    <Select.ValueText
                        fontWeight="500"
                        placeholder={placeholder}
                        opacity={value[0] === '' ? '0.5' : '1'}
                    />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content
                        zIndex="max"
                        bg="card"
                        rounded="28px"
                        p="8px"
                    >
                        {options.map((option) => (
                            <Select.Item
                                rounded="full"
                                _checked={{
                                    background: 'card',
                                }}
                                item={option}
                                key={option.value}
                            >
                                <Flex alignItems="center" gap="8px">
                                    {option.icon && option.icon}
                                    {option.label}
                                </Flex>
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}
