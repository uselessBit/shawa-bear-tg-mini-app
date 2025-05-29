from sqladmin import ModelView

from src.clients.database.models.price import Price


class PriceAdmin(ModelView, model=Price):
    column_list = [
        Price.price_id,
        Price.size_id,
        Price.product_id,
        Price.price,
        Price.proteins,
        Price.fats,
        Price.carbohydrates,
        Price.calories,
        Price.is_custom,
    ]
    name_plural = "Prices"