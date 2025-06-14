from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, field_validator


class OrderStatus(StrEnum):
    CREATED = "created"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    TAKEN = "taken"
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
    discount: float | None

    class Config:
        use_enum_values = True

    @field_validator("time_taken")
    def validate_time_format(cls, value):
        try:
            h, m, s = map(int, value.split(":"))
            if not (0 <= h <= 23 and 0 <= m <= 59 and 0 <= s <= 59):
                raise ValueError("Invalid time values")
            return value
        except (ValueError, AttributeError):
            raise ValueError("Time must be in HH:MM:SS format")

class OrderItemResponse(BaseModel):
    order_item_id: int
    price_id: int
    quantity: int
    excluded_ingredient_ids: list[int]


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
    discount: float | None
    items: list[OrderItemResponse]

    class Config:
        from_attributes = True
