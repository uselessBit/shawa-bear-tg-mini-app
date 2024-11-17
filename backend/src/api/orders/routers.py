from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.orders.schemas import OrderCreate, OrderResponse
from src.api.orders.services import OrderService
from src.database import get_session

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/create", response_model=OrderResponse)
async def create_order(
        order_data: OrderCreate, session: AsyncSession = Depends(get_session)
) -> OrderResponse:
    return await OrderService.create_order(order_data, session)


@router.get("/get/{order_id}", response_model=OrderResponse)
async def get_order(
        order_id: int, session: AsyncSession = Depends(get_session)
) -> OrderResponse:
    return await OrderService.get_order(order_id, session)
