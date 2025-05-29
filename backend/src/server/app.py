from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from src.admin.models.basket_admin import BasketAdmin, BasketItemAdmin, BasketItemExcludedIngredientAdmin
from src.admin.models.category_admin import CategoryAdmin
from src.admin.models.ingredient_admin import IngredientAdmin
from src.admin.models.order_admin import OrderAdmin
from src.admin.models.price_admin import PriceAdmin
from src.admin.models.product_admin import ProductAdmin, ProductIngredientAdmin
from src.admin.models.size_admin import SizeAdmin
from src.admin.models.user_admin import UserAdmin
from starlette.middleware.cors import CORSMiddleware
from sqladmin import Admin

from src.container import DependencyContainer, container
from src.server.handle_erros import patch_exception_handlers
from src.server.routers.v1.routers import api_v1_router


class CustomFastAPI(FastAPI):
    container: DependencyContainer


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


def create_application() -> CustomFastAPI:
    server = CustomFastAPI(title="tg-mini-app")
    server.container = DependencyContainer()
    server.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    admin = Admin(server, engine=container.database().engine)
    admin.add_view(UserAdmin)
    admin.add_view(IngredientAdmin)
    admin.add_view(OrderAdmin)
    admin.add_view(PriceAdmin)
    admin.add_view(ProductAdmin)
    admin.add_view(ProductIngredientAdmin)
    admin.add_view(SizeAdmin)
    admin.add_view(CategoryAdmin)
    admin.add_view(BasketAdmin)
    admin.add_view(BasketItemAdmin)
    admin.add_view(BasketItemExcludedIngredientAdmin)

    patch_exception_handlers(app=server)
    server.mount("/media", StaticFiles(directory="/media"), name="media")
    server.include_router(api_v1_router)
    return server
