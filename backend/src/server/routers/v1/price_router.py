from fastapi import APIRouter, Depends
from dependency_injector.wiring import Provide, inject
from starlette.responses import JSONResponse
from src.container import DependencyContainer
from src.services.price.interface import PriceServiceI
from src.services.price.schemas import PriceCreate, PriceResponse, PriceUpdate

router = APIRouter(prefix="/price", tags=["Price"])

@router.post("/create_price")
@inject
async def create_price(
        price: PriceCreate,
        price_service: PriceServiceI = Depends(Provide[DependencyContainer.price_service])
) -> JSONResponse:
    await price_service.create(price)
    return JSONResponse(content={"message": "Price created successfully"}, status_code=200)


@router.get("/get_price")
@inject
async def get_price(
        price_service: PriceServiceI = Depends(Provide[DependencyContainer.price_service])
) -> list[PriceResponse]:
    return await price_service.get_all()


@router.patch("/update_price/{price_id}")
@inject
async def update_price(
        price_id: int,
        price: PriceUpdate,
        price_service: PriceServiceI = Depends(Provide[DependencyContainer.price_service])
) -> JSONResponse:
    await price_service.update(price_id, price)
    return JSONResponse(content={"message": "Price updated successfully"}, status_code=200)