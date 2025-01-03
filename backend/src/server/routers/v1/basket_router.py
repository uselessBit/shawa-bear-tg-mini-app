from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.basket.interface import BasketServiceI
from src.services.basket.schemas import BasketItemCreate, BasketResponse

router = APIRouter(prefix="/basket", tags=["Basket"])


async def get_basket_service() -> BasketServiceI:
    return container.basket_service()


@router.get("/get_basket/{user_id}", response_model=BasketResponse)
async def get_basket(
    user_id: int,
    basket_service: BasketServiceI = Depends(get_basket_service),
) -> BasketResponse:
    return await basket_service.get_user_basket(user_id)


@router.post("/add_item")
async def add_item(
    user_id: int,
    item_data: BasketItemCreate,
    basket_service: BasketServiceI = Depends(get_basket_service),
) -> JSONResponse:
    await basket_service.add_item(user_id, item_data)
    return JSONResponse(content={"message": "Item added to basket successfully"}, status_code=200)


@router.delete("/remove_item/{basket_item_id}")
async def remove_item(
    basket_item_id: int,
    basket_service: BasketServiceI = Depends(get_basket_service),
) -> JSONResponse:
    await basket_service.remove_item(basket_item_id)
    return JSONResponse(content={"message": "Item removed from basket"}, status_code=200)
