from sqladmin import ModelView

from src.clients.database.models.order import Order


class OrderAdmin(ModelView, model=Order):
    column_list = [
        Order.order_id,
        Order.basket_id,
        Order.order_date,
        Order.total_price,
        Order.payment_option,
        Order.time_taken,
        Order.comment,
        Order.status,
        Order.first_name,
        Order.address,
        Order.phone,
    ]
    name_plural = "Orders"