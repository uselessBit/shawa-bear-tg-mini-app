from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.api.basket.models import Basket, BasketItem
from src.api.basket.schemas import BasketItemCreate, BasketItemResponse, BasketResponse


class BasketService:
    @staticmethod
    async def get_user_basket(user_id: int, session: AsyncSession) -> BasketResponse:
        query = select(Basket).where(Basket.user_id == user_id).options(joinedload(Basket.items))
        result = await session.execute(query)
        basket = result.unique().scalar_one_or_none()
        if not basket:
            raise HTTPException(status_code=404, detail="Basket not found")

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

    @staticmethod
    async def add_item(user_id: int, item_data: BasketItemCreate, session: AsyncSession) -> None:
        async with session.begin():
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

    @staticmethod
    async def remove_item(basket_item_id: int, session: AsyncSession) -> None:
        async with session.begin():
            query = select(BasketItem).where(BasketItem.basket_item_id == basket_item_id)
            result = await session.execute(query)
            item = result.scalar()

            if not item:
                raise HTTPException(status_code=404, detail="Basket item not found")

            await session.delete(item)
