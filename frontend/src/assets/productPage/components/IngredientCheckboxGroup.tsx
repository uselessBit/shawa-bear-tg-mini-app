import {
    CheckboxCard,
    CheckboxGroup,
    Heading,
    Flex,
    Image,
} from '@chakra-ui/react'
import { Ingredient } from '@/types/Products.ts'
import API_BASE_URL from '@/config.ts'

type IngredientCheckboxGroupProps = {
    ingredients: Ingredient[]
}

export default function IngredientCheckboxGroup({
    ingredients,
}: IngredientCheckboxGroupProps) {
    return (
        <CheckboxGroup pt="16px">
            <Heading textAlign="center" w="full" size="2xl">
                Состав
            </Heading>
            <Flex wrap="wrap" gap="8px">
                {ingredients.slice(1).map((ingredient) => (
                    <CheckboxCard.Root
                        minW="fit-content"
                        maxW="fit-content"
                        border="none"
                        rounded="full"
                        bgImage={`url(${API_BASE_URL}media/ingredients/${ingredient.image_url})`}
                        bgFilter=""
                        bgSize="200px"
                    >
                        <CheckboxCard.HiddenInput />

                        <CheckboxCard.Control px="16px" py="8px">
                            <CheckboxCard.Label>
                                <Image
                                    src={`${API_BASE_URL}media/ingredients/${ingredient.image_url}`}
                                    h="24px"
                                />
                                {ingredient.name}
                            </CheckboxCard.Label>
                            <CheckboxCard.Indicator />
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                ))}
            </Flex>
        </CheckboxGroup>
    )
}
