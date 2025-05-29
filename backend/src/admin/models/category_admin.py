from sqladmin import ModelView

from src.clients.database.models.category import Category


class CategoryAdmin(ModelView, model=Category):
    column_list = [
        Category.category_id,
        Category.name,
    ]
    name_plural = "Categories"