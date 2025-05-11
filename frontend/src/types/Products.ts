export interface Size {
    size_id: number
    name: string
    grams: number
}

export interface Ingredient {
    ingredient_id: number
    name: string
    image_url: string | null
    price: number
}

export interface Category {
    category_id: number
    name: string
}

export interface Product {
    product_id: number
    name: string
    description: string
    image_url: string
    ingredients: Ingredient[]
    category: Category
}

export interface Price {
    price_id: number
    size: Size
    price: number
    product: Product
    proteins: number
    fats: number
    carbohydrates: number
    calories: number
    is_custom: boolean
}
