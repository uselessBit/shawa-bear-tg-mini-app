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
                        key={ingredient.ingredient_id}
                        minW="fit-content"
                        maxW="fit-content"
                        border="none"
                        rounded="full"
                        bg={`${ingredient.color}/10`}
                        position="relative"
                        _checked={{
                            boxShadow: 'none',
                            // Убрали общий opacity
                            '& .checkbox-control': {
                                // Добавляем класс к контролу
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
                        <CheckboxCard.HiddenInput />
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
                ))}
            </Flex>
        </CheckboxGroup>
    )
}
