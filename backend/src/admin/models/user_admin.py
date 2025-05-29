from sqladmin import ModelView
from src.clients.database.models.user import User


class UserAdmin(ModelView, model=User):
    column_list = [
        User.user_id,
        User.first_name,
        User.last_name,
        User.username,
        User.language_code,
        User.coins,
    ]
    name_plural = "Users"