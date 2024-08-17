from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    name: str = Field(..., max_length=30)
    description: str = ...
    price: int = ...


class ProductResponse(BaseModel):
    product_id: int
    name: str
    description: str
    price: int
