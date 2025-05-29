from sqladmin import ModelView

from src.clients.database.models.product import Product, ProductIngredient


class ProductAdmin(ModelView, model=Product):
    column_list = [
        Product.product_id,
        Product.category_id,
        Product.name,
        Product.description,
        Product.image_url,
    ]
    name_plural = "Products"

class ProductIngredientAdmin(ModelView, model=ProductIngredient):
    column_list = [
        ProductIngredient.product_id,
        ProductIngredient.ingredient_id,
    ]
    name_plural = "Products Ingredients"