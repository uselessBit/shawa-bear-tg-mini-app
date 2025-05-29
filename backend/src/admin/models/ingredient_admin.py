from sqladmin import ModelView

from src.clients.database.models.ingredient import Ingredient


class IngredientAdmin(ModelView, model=Ingredient):
    column_list = [
        Ingredient.ingredient_id,
        Ingredient.name,
        Ingredient.image_url,
        Ingredient.price,
        Ingredient.color,
        Ingredient.type,
        Ingredient.grams,
    ]
    name_plural = "Ingredients"