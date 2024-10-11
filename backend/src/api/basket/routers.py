from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession


from src.api.basket.services import create, get_by_user_id
from src.database import get_session

router = APIRouter(prefix="/basket", tags=["Basket"])


@router.post("/add_to_basket")
async def add_to_basket(basket: ..., db: AsyncSession = Depends(get_session)) -> dict[str, Any]:
    return await create(basket, db)


@router.get("/get_user_by_id", response_model=...)
async def get_basket_by_user_id(user_id: int, db: AsyncSession = Depends(get_session)) -> ...:
    return await get_by_user_id(user_id, db)
