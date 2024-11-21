from typing import Callable

from src.clients.database.models.product import Product
from src.clients.database.models.size import Size
from src.services.ingredient.schemas import IngredientResponse
from src.services.errors import PriceNotFoundError, SizeNotFoundError, ProductNotFoundError
from src.services.price.interface import PriceServiceI
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from src.services.price.schemas import PriceCreate, PriceResponse, PriceUpdate
from sqlalchemy import select
from src.clients.database.models.price import Price
from src.services.product.schemas import ProductResponse
from src.services.size.schemas import SizeResponse


class PriceService(PriceServiceI):
    def __init__(self, session: Callable[..., AsyncSession]) -> None:
        self.session = session

    async def create(self, price_data: PriceCreate) -> None:
        async with self.session() as session:
            async with session.begin():
                query = select(Product).where(Product.product_id == price_data.product_id)
                result = await session.execute(query)
                product = result.scalar_one_or_none()
                if not product:
                    raise ProductNotFoundError

                query = select(Size).where(Size.size_id == price_data.size_id)
                result = await session.execute(query)
                size = result.scalar_one_or_none()
                if not size:
                    raise SizeNotFoundError

                price = Price(
                    size_id=price_data.size_id,
                    product_id=price_data.product_id,
                    price=price_data.price,
                )
                session.add(price)

    async def get_all(self) -> list[PriceResponse]:
        async with self.session() as session:
            query = select(Price).options(
                selectinload(Price.product).selectinload(Product.ingredients),
                selectinload(Price.size),
            )
            result = await session.execute(query)
            prices = result.scalars().all()

            price_responses = []
            for price in prices:
                price_response = PriceResponse(
                    price_id=price.price_id,
                    size=SizeResponse(
                        size_id=price.size.size_id,
                        name=price.size.name,
                        grams=price.size.grams,
                    ),
                    products=ProductResponse(
                        product_id=price.product.product_id,
                        name=price.product.name,
                        description=price.product.description,
                        image_url=price.product.image_url,
                        ingredient_ids=[
                            IngredientResponse(
                                ingredient_id=ingredient.ingredient_id,
                                name=ingredient.name,
                                image_url=ingredient.image_url,
                            )
                            for ingredient in price.product.ingredients
                        ],
                    ),
                    price=price.price,
                )
                price_responses.append(price_response)

            return price_responses

    async def update(self, price_id: int, price_data: PriceUpdate) -> None:
        async with self.session() as session:
            async with session.begin():
                price = await session.get(Price, price_id)
                if price:
                    if price_data.price:
                        price.price = price_data.price
                else:
                    raise PriceNotFoundError