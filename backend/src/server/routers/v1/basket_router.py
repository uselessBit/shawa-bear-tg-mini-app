from fastapi import APIRouter, Depends
from dependency_injector.wiring import Provide, inject

from src.container import DependencyContainer
from src.services.basket.interface import BasketServiceI
from src.services.basket.schemas import BasketResponse, BasketItemCreate
from starlette.responses import JSONResponse

router = APIRouter(prefix="/basket", tags=["Basket"])


@router.get("/get_basket/{user_id}", response_model=BasketResponse)
@inject
async def get_basket(
        user_id: int,
        basket_service: BasketServiceI = Depends(Provide[DependencyContainer.basket_service])
) -> BasketResponse:
    return await basket_service.get_user_basket(user_id)


@router.post("/add_item")
async def add_item(
        user_id: int,
        item_data: BasketItemCreate,
        basket_service: BasketServiceI = Depends(Provide[DependencyContainer.basket_service]),
) -> JSONResponse:
    await basket_service.add_item(user_id, item_data)
    return JSONResponse(content={"message": "Item added to basket successfully"}, status_code=200)


@router.delete("/remove_item/{basket_item_id}")
async def remove_item(
        basket_item_id: int,
        basket_service: BasketServiceI = Depends(Provide[DependencyContainer.basket_service])
) -> JSONResponse:
    await basket_service.remove_item(basket_item_id)
    return JSONResponse(content={"message": "Item removed from basket"}, status_code=200)