from datetime import datetime
from pydantic import BaseModel


class OrderCreate(BaseModel):
    basket_id: int
    total_price: float


class OrderResponse(BaseModel):
    order_id: int
    basket_id: int
    order_date: datetime
    total_price: float

    class Config:
        from_attributes = True
