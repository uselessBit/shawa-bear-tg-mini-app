from sqladmin import ModelView

from src.clients.database.models.size import Size


class SizeAdmin(ModelView, model=Size):
    column_list = [
        Size.size_id,
        Size.name,
        Size.grams,
    ]
    name_plural = "Sizes"