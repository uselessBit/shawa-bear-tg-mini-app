from sqladmin import ModelView

from src.clients.database.models.basket import Basket, BasketItem, BasketItemExcludedIngredient


class BasketAdmin(ModelView, model=Basket):
    column_list = [
        Basket.basket_id,
        Basket.user_id,
    ]
    name_plural = "Baskets"

class BasketItemAdmin(ModelView, model=BasketItem):
    column_list = [
        BasketItem.basket_item_id,
        BasketItem.basket_id,
        BasketItem.price_id,
        BasketItem.quantity,
    ]
    name_plural = "Basket Items"


class BasketItemExcludedIngredientAdmin(ModelView, model=BasketItemExcludedIngredient):
    column_list = [
        BasketItemExcludedIngredient.basket_item_id,
        BasketItemExcludedIngredient.ingredient_id,
    ]
    name_plural = "Basket Item Excluded Ingredients"