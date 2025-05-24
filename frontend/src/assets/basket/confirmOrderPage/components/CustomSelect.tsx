import { Portal, Select, createListCollection } from '@chakra-ui/react'

export default function CustomSelect() {
    return (
        <Select.Root
            collection={frameworks}
            size="lg"
            width="full"
            bg="back"
            rounded="full"
        >
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger borderWidth="0" py="16px" px="24px">
                    <Select.ValueText
                        fontWeight="500"
                        placeholder="Select framework"
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
                        {frameworks.items.map((framework) => (
                            <Select.Item
                                rounded="full"
                                _checked={{
                                    background: 'card',
                                }}
                                item={framework}
                                key={framework.value}
                            >
                                {framework.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}

const frameworks = createListCollection({
    items: [
        { label: 'React.js', value: 'react' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
    ],
})
