from pydantic import TypeAdapter
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from src.clients.database.models.price import Price
from src.clients.database.models.product import Product
from src.clients.database.models.size import Size
from src.services.base import BaseService
from src.services.errors import PriceNotFoundError, ProductNotFoundError, SizeNotFoundError
from src.services.price.interface import PriceServiceI
from src.services.price.schemas import PriceCreate, PriceFilter, PriceResponse, PriceUpdate


class PriceService(BaseService, PriceServiceI):
    async def create(self, price_data: PriceCreate) -> PriceResponse:
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
                **price_data.model_dump(),
            )
            session.add(price)
            await session.flush()

            query = (
                select(Price).where(Price.price_id == price.price_id)
                .options(
                    selectinload(Price.product).selectinload(Product.ingredients),
                    selectinload(Price.product).selectinload(Product.category),
                    selectinload(Price.size),
                )
            )
            result = await session.execute(query)
            price = result.scalar_one_or_none()
            type_adapter = TypeAdapter(PriceResponse)
            return type_adapter.validate_python(price)

    async def get_all(self) -> list[PriceResponse]:
        async with self.session() as session:
            query = (
                select(Price)
                .options(
                    selectinload(Price.product).selectinload(Product.ingredients),
                    selectinload(Price.product).selectinload(Product.category),
                    selectinload(Price.size),
                )
                .filter(Price.is_custom == False)
            )
            result = await session.execute(query)
            prices = result.scalars().all()
            type_adapter = TypeAdapter(list[PriceResponse])
            return type_adapter.validate_python(prices)

    async def update(self, price_id: int, price_data: PriceUpdate) -> None:
        async with self.session() as session, session.begin():
            price = await session.get(Price, price_id)
            if not price:
                raise PriceNotFoundError

            update_data = price_data.model_dump(exclude_unset=True, exclude={"product_id", "price_id"})

            for field, value in update_data.items():
                if hasattr(price, field):
                    setattr(price, field, value)

    async def delete(self, price_id: int) -> None:
        async with self.session() as session:
            price = await session.get(Price, price_id)
            if not price:
                raise PriceNotFoundError
            await session.delete(price)
            await session.commit()

    async def filter_price(self, price_filter: PriceFilter) -> list[PriceResponse]:
        async with self.session() as session:
            query = (
                select(Price)
                .options(
                    selectinload(Price.product).selectinload(Product.ingredients),
                    selectinload(Price.size),
                )
                .filter(Price.is_custom == False)
            )

            if price_filter.min_price:
                query = query.filter(Price.price >= price_filter.min_price)
            if price_filter.max_price:
                query = query.filter(Price.price <= price_filter.max_price)
            if price_filter.min_grams:
                query = query.filter(Price.size.has(Size.grams >= price_filter.min_grams))
            if price_filter.max_grams:
                query = query.filter(Price.size.has(Size.grams <= price_filter.max_grams))

            result = await session.execute(query)
            prices = result.scalars().all()
            type_adapter = TypeAdapter(list[PriceResponse])
            return type_adapter.validate_python(prices)