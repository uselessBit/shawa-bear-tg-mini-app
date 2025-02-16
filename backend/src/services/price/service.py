from pydantic import TypeAdapter
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from src.clients.database.models.price import Price
from src.clients.database.models.product import Product
from src.clients.database.models.size import Size
from src.services.base import BaseService
from src.services.errors import PriceNotFoundError, ProductNotFoundError, SizeNotFoundError
from src.services.price.interface import PriceServiceI
from src.services.price.schemas import PriceCreate, PriceResponse, PriceUpdate


class PriceService(BaseService, PriceServiceI):
    async def create(self, price_data: PriceCreate) -> None:
        async with self.session() as session, session.begin():
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
            type_adapter = TypeAdapter(list[PriceResponse])
            return type_adapter.validate_python(prices)

    async def update(self, price_id: int, price_data: PriceUpdate) -> None:
        async with self.session() as session, session.begin():
            price = await session.get(Price, price_id)
            if price:
                if price_data.price:
                    price.price = price_data.price
            else:
                raise PriceNotFoundError

    async def delete(self, price_id: int) -> None:
        async with self.session() as session:
            price = await session.get(Price, price_id)
            if not price:
                raise PriceNotFoundError
            await session.delete(price)
            await session.commit()
