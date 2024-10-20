from typing import Any

from sqlalchemy import Select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.basket.models import Basket
from src.api.basket.schemas import AddBasketItem, BasketResponse


async def create(basket: AddBasketItem, db: AsyncSession) -> dict[str, Any]:
    async with db.begin():
        new_user = Basket(
            user_id=basket.user_id,
            product_id=basket.product_id,
            quantity=basket.quantity,
            total_price=...
        )
        db.add(new_user)
        return {"message": "User created successfully"}


async def get_by_user_id(user_id: int, db: AsyncSession) -> BasketResponse:
    async with db.begin():
        query = Select(Basket).where(user_id == User.user_id)
        result = await db.execute(query)
        user = result.scalar_one_or_none()
    return user
