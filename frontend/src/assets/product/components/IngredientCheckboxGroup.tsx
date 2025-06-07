import {
    CheckboxCard,
    CheckboxGroup,
    Heading,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react'
import { Ingredient } from '@/types/Products.ts'
import API_BASE_URL from '@/config.ts'
import { IoClose } from 'react-icons/io5'
import { useState } from 'react'

type IngredientCheckboxGroupProps = {
    ingredients: Ingredient[]
    onChange: (ids: number[]) => void
}

export default function IngredientCheckboxGroup({
    ingredients,
    onChange,
}: IngredientCheckboxGroupProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const handleCheckboxChange = (ingredientId: number, isChecked: boolean) => {
        const newIds = isChecked
            ? [...selectedIds, ingredientId]
            : selectedIds.filter((id) => id !== ingredientId)

        setSelectedIds(newIds)
        onChange(newIds)
    }

    return (
        <CheckboxGroup pt="16px">
            <Heading textAlign="center" w="full" size="2xl">
                Состав
            </Heading>
            <Flex wrap="wrap" gap="8px">
                {ingredients.map(
                    (ingredient) =>
                        ingredient.type !== 'base' && (
                            <>
                                <CheckboxCard.Root
                                    key={`${ingredient.ingredient_id} ${ingredient.name}`}
                                    cursor="pointer"
                                    minW="fit-content"
                                    maxW="fit-content"
                                    border="none"
                                    rounded="full"
                                    bg={`${ingredient.color}/10`}
                                    position="relative"
                                    _checked={{
                                        boxShadow: 'none',
                                        '& .checkbox-control': {
                                            opacity: 0.5,
                                        },
                                        '&::after': {
                                            opacity: '1',
                                            content: '""',
                                            position: 'absolute',
                                            left: '16px',
                                            bottom: '16px',
                                            width: 'calc(100% - 32px)',
                                            height: '2px',
                                            bg: 'text',
                                            transform: 'rotate(-2deg)',
                                            transformOrigin: 'left bottom',
                                        },
                                    }}
                                >
                                    <CheckboxCard.HiddenInput
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                ingredient.ingredient_id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <CheckboxCard.Control
                                        px="16px"
                                        py="8px"
                                        className="checkbox-control"
                                    >
                                        <CheckboxCard.Label>
                                            <Image
                                                src={`${API_BASE_URL}media/ingredients/${ingredient.image_url}`}
                                                h="24px"
                                            />
                                            <Text>{ingredient.name}</Text>
                                            <IoClose />
                                        </CheckboxCard.Label>
                                    </CheckboxCard.Control>
                                </CheckboxCard.Root>
                            </>
                        )
                )}
            </Flex>
        </CheckboxGroup>
    )
}
