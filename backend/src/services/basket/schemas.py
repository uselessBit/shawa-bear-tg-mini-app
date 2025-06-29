from pydantic import BaseModel, Field


class BasketItemCreate(BaseModel):
    price_id: int
    quantity: int = Field(..., ge=1)
    excluded_ingredient_ids: list[int] = Field(default_factory=list)


class BasketItemResponse(BaseModel):
    basket_item_id: int
    price_id: int
    quantity: int
    excluded_ingredient_ids: list[int]


class BasketResponse(BaseModel):
    basket_id: int
    user_id: int
    discount: float | None
    items: list[BasketItemResponse]
    total_price: float


class QuantityUpdate(BaseModel):
    basket_item_id: int
    quantity: int
