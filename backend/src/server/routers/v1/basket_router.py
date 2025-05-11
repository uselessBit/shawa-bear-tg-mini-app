from http import HTTPStatus

from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.basket.interface import BasketServiceI
from src.services.basket.schemas import BasketItemCreate, BasketResponse
from src.services.static import create_message, delete_message

basket_tag = "Basket"
router = APIRouter(prefix="/basket", tags=[basket_tag])


async def get_basket_service() -> BasketServiceI:
    return container.basket_service()


@router.get("/{user_id}", response_model=BasketResponse)
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
    return JSONResponse(
        content={"message": create_message.format(entity=basket_tag + " item")}, status_code=HTTPStatus.CREATED
    )


@router.delete("/remove_item/{basket_item_id}")
async def remove_item(
    basket_item_id: int,
    basket_service: BasketServiceI = Depends(get_basket_service),
) -> JSONResponse:
    await basket_service.remove_item(basket_item_id)
    return JSONResponse(content={"message": "Item removed from basket"}, status_code=200)


@router.delete("/{basket_id}")
async def clear_basket(
    basket_id: int,
    basket_service: BasketServiceI = Depends(get_basket_service),
) -> JSONResponse:
    await basket_service.clear_basket(basket_id)
    return JSONResponse(content={"message": delete_message.format(entity=basket_tag)}, status_code=200)
