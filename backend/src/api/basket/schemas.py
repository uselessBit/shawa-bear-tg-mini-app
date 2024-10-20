from pydantic import BaseModel


class AddBasketItem(BaseModel):
    user_id: int
    product_id: str
    quantity: str


class BasketResponse(BaseModel):
    basket_id: int
    user_id: int
    product_id: int
    quantity: int
    total_price: int

    # class Config:
    #     from_attributes = True
