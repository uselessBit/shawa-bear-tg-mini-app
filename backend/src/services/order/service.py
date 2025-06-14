import asyncio
from collections.abc import Callable
from datetime import UTC, datetime

from pydantic import TypeAdapter
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.clients.database.models.basket import BasketItem, Basket
from src.clients.database.models.order import Order, OrderItem
from src.clients.database.models.user import User
from src.services.base import BaseService
from src.services.basket.interface import BasketServiceI
from src.services.errors import OrderNotFoundError, PriceNotFoundError, BasketNotFoundError
from src.services.order.interface import OrderServiceI
from src.services.order.schemas import OrderCreate, OrderResponse, OrderStatus, OrderItemResponse


class OrderService(BaseService, OrderServiceI):
    def __init__(self, session: Callable[..., AsyncSession], basket_service: BasketServiceI) -> None:
        super().__init__(session)
        self.basket_service = basket_service

    async def create_order(self, user_id: int, order_data: OrderCreate) -> None:
        try:
            time_taken_seconds = self.parse_time(order_data.time_taken)
        except ValueError as e:
            raise ValueError("Invalid time_taken format") from e

        async with self.session() as session, session.begin():
            total_price = await self._calculate_total_price(session, order_data.basket_id)
            new_order = Order(
                user_id=user_id,
                total_price=total_price,
                order_date=datetime.now(tz=UTC),
                **order_data.model_dump(),
            )
            session.add(new_order)
            await session.flush()
            order_id = new_order.order_id

            query = select(Basket).where(Basket.user_id == user_id).options(
                joinedload(Basket.items).joinedload(BasketItem.price),
                joinedload(Basket.items).joinedload(BasketItem.excluded_ingredients)
            )
            result = await session.execute(query)
            basket = result.unique().scalar_one_or_none()

            if not basket.items:
                raise BasketNotFoundError


            for basket_item in basket.items:
                order_item = OrderItem(
                    order_id=new_order.order_id,
                    price_id=basket_item.price_id,
                    quantity=basket_item.quantity,
                    excluded_ingredients=basket_item.excluded_ingredients.copy()
                )
                session.add(order_item)

        await self.basket_service.clear_basket(order_data.basket_id)
        asyncio.create_task(self.status_flow(order_id, time_taken_seconds))

    async def get_order(self, order_id: int) -> OrderResponse:
        async with self.session() as session:
            query = select(Order).where(Order.order_id == order_id)
            result = await session.execute(query)
            order = result.scalar_one_or_none()

            if not order:
                raise OrderNotFoundError
            type_adapter = TypeAdapter(OrderResponse)
            return type_adapter.validate_python(order)

    async def get_all(self, user_id: int | None) -> list[OrderResponse]:
        async with self.session() as session:
            query = select(Order).where(Order.user_id == user_id).options(
                joinedload(Order.items).joinedload(OrderItem.price),
                joinedload(Order.items).joinedload(OrderItem.excluded_ingredients)
            )
            result = await session.execute(query)
            orders = result.unique().scalars().all()

            if not orders:
                raise OrderNotFoundError

            return [OrderResponse(
                    order_id=order.order_id,
                    basket_id=order.basket_id,
                    order_date=order.order_date,
                    payment_option=order.payment_option,
                    time_taken=order.time_taken,
                    total_price=order.total_price,
                    comment=order.comment,
                    status=order.status,
                    first_name=order.first_name,
                    address=order.address,
                    phone=order.phone,
                    discount=order.discount,
                    items=[
                        OrderItemResponse(
                            order_item_id=item.order_item_id,
                            price_id=item.price_id,
                            quantity=item.quantity,
                            excluded_ingredient_ids=[ing.ingredient_id for ing in item.excluded_ingredients]
                        )
                        for item in order.items
                    ],
                ) for order in orders]


    async def change_status(self, order_id: int, status: OrderStatus) -> None:
        async with self.session() as session:
            order = await session.get(Order, order_id)
            if order:
                if order.status != status.value:
                    order.status = status.value
                    await session.commit()
            else:
                raise OrderNotFoundError

    @staticmethod
    async def _calculate_total_price(session, basket_id: int) -> float:
        query = select(BasketItem).where(BasketItem.basket_id == basket_id).options(joinedload(BasketItem.price))
        result = await session.execute(query)
        items = result.scalars().unique().all()

        total = 0.0
        for item in items:
            if item.price:
                total += item.quantity * item.price.price
            else:
                raise PriceNotFoundError()
        return total

    @staticmethod
    def parse_time(time_str: str) -> int:
        h, m, s = map(int, time_str.split(':'))
        return h * 3600 + m * 60 + s

    async def status_flow(self, order_id: int, time_taken_seconds: int):
        try:
            await asyncio.sleep(60)
            await self.change_status(order_id, OrderStatus.IN_PROGRESS)

            await asyncio.sleep(time_taken_seconds)
            await self.change_status(order_id, OrderStatus.COMPLETED)

            await asyncio.sleep(300)
            await self.change_status(order_id, OrderStatus.TAKEN)
            asyncio.create_task(self.earning_points(order_id))
        except Exception as e:
            print(f"Error in status flow for order {order_id}: {e}")

    async def earning_points(self, order_id: int):
        async with self.session() as session, session.begin():
            query = select(Order).where(Order.order_id == order_id)
            result = await session.execute(query)
            order: Order = result.scalars().first()

            stmt = (
                update(User)
                .where(User.user_id == order.user_id)
                .values(coins=User.coins + int(order.total_price/10))

            )
            await session.execute(stmt)
