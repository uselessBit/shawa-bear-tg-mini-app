from datetime import UTC, datetime

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.orders.models import Order
from src.api.orders.schemas import OrderCreate, OrderResponse


class OrderService:
    @staticmethod
    async def create_order(order_data: OrderCreate, session: AsyncSession) -> OrderResponse:
        async with session.begin():
            new_order = Order(
                basket_id=order_data.basket_id,
                total_price=order_data.total_price,
                order_date=datetime.now(tz=UTC),
            )
            session.add(new_order)
            await session.flush()

            return OrderResponse(
                order_id=new_order.order_id,
                basket_id=new_order.basket_id,
                order_date=new_order.order_date,
                total_price=new_order.total_price,
            )

    @staticmethod
    async def get_order(order_id: int, session: AsyncSession) -> OrderResponse:
        query = select(Order).where(Order.order_id == order_id)
        result = await session.execute(query)
        order = result.scalar_one_or_none()

        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        return OrderResponse(
            order_id=order.order_id,
            basket_id=order.basket_id,
            order_date=order.order_date,
            total_price=order.total_price,
        )
