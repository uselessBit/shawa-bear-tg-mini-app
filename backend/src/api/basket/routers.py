from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.basket.schemas import BasketItemCreate, BasketResponse
from src.api.basket.services import BasketService
from src.database import get_session

router = APIRouter(prefix="/basket", tags=["Basket"])


@router.get("/get_basket/{user_id}", response_model=BasketResponse)
async def get_basket(user_id: int, session: AsyncSession = Depends(get_session)) -> BasketResponse:
    return await BasketService.get_user_basket(user_id, session)


@router.post("/add_item")
async def add_item(
    user_id: int,
    item_data: BasketItemCreate,
    session: AsyncSession = Depends(get_session),
) -> dict[str, str]:
    await BasketService.add_item(user_id, item_data, session)
    return {"message": "Item added to basket successfully"}


@router.delete("/remove_item/{basket_item_id}")
async def remove_item(basket_item_id: int, session: AsyncSession = Depends(get_session)) -> dict[str, str]:
    await BasketService.remove_item(basket_item_id, session)
    return {"message": "Item removed from basket"}
