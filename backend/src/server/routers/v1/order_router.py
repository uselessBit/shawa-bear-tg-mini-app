from fastapi import APIRouter, Depends
from dependency_injector.wiring import Provide, inject
from starlette.responses import JSONResponse
from src.container import DependencyContainer
from src.services.order.interface import OrderServiceI
from src.services.order.schemas import OrderCreate, OrderResponse

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/create", response_model=OrderResponse)
@inject
async def create_order(
        order_data: OrderCreate,
        order_service: OrderServiceI = Depends(Provide[DependencyContainer.order_service]),
) -> JSONResponse:
    await order_service.create_order(order_data)
    return JSONResponse(content={"message": "Order created successfully"}, status_code=200)


@router.get("/get/{order_id}", response_model=OrderResponse)
@inject
async def get_order(
        order_id: int,
        order_service: OrderServiceI = Depends(Provide[DependencyContainer.order_service]),
) -> OrderResponse:
    return await order_service.get_order(order_id)