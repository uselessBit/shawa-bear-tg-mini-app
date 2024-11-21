from dependency_injector import containers
from dependency_injector.providers import Singleton, Factory, Resource

from src.services.basket.interface import BasketServiceI
from src.services.basket.service import BasketService
from src.services.ingredient.interface import IngredientServiceI
from src.services.ingredient.service import IngredientService
from src.services.order.interface import OrderServiceI
from src.services.order.service import OrderService
from src.services.price.interface import PriceServiceI
from src.services.price.service import PriceService
from src.services.product.interface import ProductIngredientServiceI, ProductServiceI
from src.services.product.service import ProductIngredientService, ProductService
from src.services.size.interface import SizeServiceI
from src.services.size.service import SizeService
from src.services.user.interface import UserServiceI
from src.services.user.service import UserService
from src.settings.database import DatabaseSettings
from src.clients.database.engine import async_engine, Database
from sqlalchemy.ext.asyncio import AsyncEngine, async_scoped_session
from sqlalchemy.ext.asyncio import AsyncSession

class DependencyContainer(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            "src.server.routers.v1",
        ],
    )

    database_settings: Singleton["DatabaseSettings"] = Singleton(DatabaseSettings)
    async_engine: Singleton["AsyncEngine"] = Singleton(
        async_engine,
        database_settings=database_settings.provided,
    )
    database: Factory["Database"] = Factory(Database, engine=async_engine.provided)
    database_session: Resource[async_scoped_session[AsyncSession]] = Resource(
        database.provided.get_session()
    )

    user_service: Factory["UserServiceI"] = Factory(UserService, session=database_session)
    size_service: Factory["SizeServiceI"] = Factory(SizeService, session=database_session)
    ingredient_service: Factory["IngredientServiceI"] = Factory(IngredientService, session=database_session)
    product_ingredient_service: Factory["ProductIngredientServiceI"] = Factory(ProductIngredientService, session=database_session)
    product_service: Factory["ProductServiceI"] = Factory(ProductService, session=database_session,
                                                          product_ingredient_service=product_ingredient_service)
    price_service: Factory["PriceServiceI"] = Factory(PriceService, session=database_session)
    basket_service: Factory["BasketServiceI"] = Factory(BasketService, session=database_session)
    order_service: Factory["OrderServiceI"] = Factory(OrderService, session=database_session)

container = DependencyContainer()