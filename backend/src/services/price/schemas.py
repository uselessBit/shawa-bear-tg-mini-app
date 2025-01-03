from pydantic import BaseModel

from src.services.product.schemas import ProductResponse
from src.services.size.schemas import SizeResponse


class PriceCreate(BaseModel):
    size_id: int
    product_id: int
    price: float


class PriceResponse(BaseModel):
    price_id: int
    size: SizeResponse
    price: float
    product: ProductResponse

    class Config:
        from_attributes = True


class PriceUpdate(BaseModel):
    price: float
