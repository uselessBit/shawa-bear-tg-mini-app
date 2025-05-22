from collections.abc import Callable
from datetime import UTC, datetime

from pydantic import TypeAdapter
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.clients.database.models.basket import BasketItem
from src.clients.database.models.order import Order
from src.services.base import BaseService
from src.services.basket.interface import BasketServiceI
from src.services.errors import OrderNotFoundError, PriceNotFoundError
from src.services.order.interface import OrderServiceI
from src.services.order.schemas import OrderCreate, OrderResponse, OrderStatus


class OrderService(BaseService, OrderServiceI):
    def __init__(self, session: Callable[..., AsyncSession], basket_service: BasketServiceI) -> None:
        super().__init__(session)
        self.basket_service = basket_service

    async def create_order(self, order_data: OrderCreate) -> None:
        async with self.session() as session, session.begin():
            total_price = await self.calculate_total_price(session, order_data.basket_id)
            new_order = Order(
                basket_id=order_data.basket_id,
                total_price=total_price,
                order_date=datetime.now(tz=UTC),
                payment_option=order_data.payment_option,
                time_taken=order_data.time_taken,
                comment=order_data.comment,
            )
            session.add(new_order)

        await self.basket_service.clear_basket(order_data.basket_id)

    async def get_order(self, order_id: int) -> OrderResponse:
        async with self.session() as session:
            query = select(Order).where(Order.order_id == order_id)
            result = await session.execute(query)
            order = result.scalar_one_or_none()

            if not order:
                raise OrderNotFoundError
            type_adapter = TypeAdapter(OrderResponse)
            return type_adapter.validate_python(order)

    async def get_all(self) -> list[OrderResponse]:
        async with self.session() as session:
            query = select(Order)
            results = await session.execute(query)
            orders = results.scalars().all()
            type_adapter = TypeAdapter(list[OrderResponse])
            return type_adapter.validate_python(orders)

    async def change_status(self, order_id: int, status: OrderStatus) -> None:
        async with self.session() as session:
            order = await session.get(Order, order_id)
            if order:
                order.status = status.value
                await session.commit()
            else:
                raise OrderNotFoundError

    async def calculate_total_price(self, session, basket_id: int) -> float:
        query = select(BasketItem).where(BasketItem.basket_id == basket_id).options(joinedload(BasketItem.price))
        result = await session.execute(query)
        items = result.scalars().all()

        total = 0.0
        for item in items:
            if item.price:
                total += item.quantity * item.price.price
            else:
                raise PriceNotFoundError()
        return total
