from datetime import datetime, UTC
from typing import Callable

from src.services.errors import OrderNotFoundError
from src.services.order.interface import OrderServiceI
from src.clients.database.models.order import Order
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.services.order.schemas import OrderCreate, OrderResponse


class OrderService(OrderServiceI):
    def __init__(self, session: Callable[..., AsyncSession]) -> None:
        self.session = session

    async def create_order(self, order_data: OrderCreate) -> None:
        async with self.session() as session:
            async with session.begin():
                new_order = Order(
                    basket_id=order_data.basket_id,
                    total_price=order_data.total_price,
                    order_date=datetime.now(tz=UTC),
                )
                session.add(new_order)
                await session.flush()

    async def get_order(self, order_id: int) -> OrderResponse:
        async with self.session() as session:
            query = select(Order).where(Order.order_id == order_id)
            result = await session.execute(query)
            order = result.scalar_one_or_none()

            if not order:
                raise OrderNotFoundError

            return OrderResponse(
                order_id=order.order_id,
                basket_id=order.basket_id,
                order_date=order.order_date,
                total_price=order.total_price,
            )