from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.price.interface import PriceServiceI
from src.services.price.schemas import PriceCreate, PriceResponse, PriceUpdate
from src.services.static import create_message, delete_message, update_message

price_tag = "Price"
router = APIRouter(prefix="/price", tags=[price_tag])


async def get_price_service() -> PriceServiceI:
    return container.price_service()


@router.post("/create_price")
async def create_price(price: PriceCreate, price_service: PriceServiceI = Depends(get_price_service)) -> JSONResponse:
    await price_service.create(price)
    return JSONResponse(content={"message": create_message.format(entity=price_tag)}, status_code=200)


@router.get("/get_price")
async def get_price(price_service: PriceServiceI = Depends(get_price_service)) -> list[PriceResponse]:
    return await price_service.get_all()


@router.patch("/update_price/{price_id}")
async def update_price(
    price_id: int, price: PriceUpdate, price_service: PriceServiceI = Depends(get_price_service)
) -> JSONResponse:
    await price_service.update(price_id, price)
    return JSONResponse(content={"message": update_message.format(entity=price_tag)}, status_code=200)


@router.delete("/delete_price/{price_id}")
async def delete_price(price_id: int, price_service: PriceServiceI = Depends(get_price_service)) -> JSONResponse:
    await price_service.delete(price_id)
    return JSONResponse(content={"message": delete_message.format(entity=price_tag)}, status_code=200)
