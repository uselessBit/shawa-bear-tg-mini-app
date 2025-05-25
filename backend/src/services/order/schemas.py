from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel


class OrderStatus(StrEnum):
    CREATED = "created"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELED = "canceled"


class PaymentOption(StrEnum):
    CARD = "card"
    CASH = "cash"


class OrderCreate(BaseModel):
    basket_id: int
    payment_option: PaymentOption = PaymentOption.CARD
    time_taken: str
    comment: str | None = None
    status: OrderStatus = OrderStatus.CREATED
    first_name: str | None
    address: str | None
    phone: str | None

    class Config:
        use_enum_values = True


class OrderResponse(BaseModel):
    order_id: int
    basket_id: int
    order_date: datetime
    payment_option: str
    time_taken: str
    total_price: float
    comment: str | None
    status: str
    first_name: str | None
    address: str | None
    phone: str | None

    class Config:
        from_attributes = True
