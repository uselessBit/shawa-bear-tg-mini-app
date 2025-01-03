from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.order.interface import OrderServiceI
from src.services.order.schemas import OrderCreate, OrderResponse

router = APIRouter(prefix="/orders", tags=["Orders"])


async def get_order_service() -> OrderServiceI:
    return container.order_service()


@router.post("/create", response_model=OrderResponse)
async def create_order(
    order_data: OrderCreate,
    order_service: OrderServiceI = Depends(get_order_service),
) -> JSONResponse:
    await order_service.create_order(order_data)
    return JSONResponse(content={"message": "Order created successfully"}, status_code=200)


@router.get("/get/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    order_service: OrderServiceI = Depends(get_order_service),
) -> OrderResponse:
    return await order_service.get_order(order_id)
