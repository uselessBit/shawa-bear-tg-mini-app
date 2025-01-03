from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.clients.database.models.basket import Basket, BasketItem
from src.services.base import BaseService
from src.services.basket.interface import BasketServiceI
from src.services.basket.schemas import BasketItemCreate, BasketItemResponse, BasketResponse
from src.services.errors import BasketItemNotFoundError, BasketNotFoundError


class BasketService(BaseService, BasketServiceI):
    async def get_user_basket(self, user_id: int) -> BasketResponse:
        async with self.session() as session:
            query = select(Basket).where(Basket.user_id == user_id).options(joinedload(Basket.items))
            result = await session.execute(query)
            basket = result.unique().scalar_one_or_none()
            if not basket:
                raise BasketNotFoundError

        return BasketResponse(
            basket_id=basket.basket_id,
            user_id=basket.user_id,
            items=[
                BasketItemResponse(
                    basket_item_id=item.basket_item_id,
                    price_id=item.price_id,
                    quantity=item.quantity,
                )
                for item in basket.items
            ],
        )

    async def add_item(self, user_id: int, item_data: BasketItemCreate) -> None:
        async with self.session() as session, session.begin():
            query = select(Basket).where(Basket.user_id == user_id)
            result = await session.execute(query)
            basket = result.scalar()

            if not basket:
                basket = Basket(user_id=user_id)
                session.add(basket)
                await session.flush()

            new_item = BasketItem(
                basket_id=basket.basket_id,
                price_id=item_data.price_id,
                quantity=item_data.quantity,
            )
            session.add(new_item)

    async def remove_item(self, basket_item_id: int) -> None:
        async with self.session() as session, session.begin():
            query = select(BasketItem).where(BasketItem.basket_item_id == basket_item_id)
            result = await session.execute(query)
            item = result.scalar()

            if not item:
                raise BasketItemNotFoundError

            await session.delete(item)
