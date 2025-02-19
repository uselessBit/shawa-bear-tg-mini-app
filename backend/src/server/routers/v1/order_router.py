from http import HTTPStatus

from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.order.interface import OrderServiceI
from src.services.order.schemas import OrderCreate, OrderResponse
from src.services.static import create_message

order_tag = "Order"
router = APIRouter(prefix="/order", tags=[order_tag])


async def get_order_service() -> OrderServiceI:
    return container.order_service()


@router.post("/create", response_model=OrderResponse)
async def create_order(
    order_data: OrderCreate,
    order_service: OrderServiceI = Depends(get_order_service),
) -> JSONResponse:
    await order_service.create_order(order_data)
    return JSONResponse(content={"message": create_message.format(entity=order_tag)}, status_code=HTTPStatus.CREATED)


@router.get("/get/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    order_service: OrderServiceI = Depends(get_order_service),
) -> OrderResponse:
    return await order_service.get_order(order_id)
