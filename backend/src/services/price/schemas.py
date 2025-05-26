from pydantic import BaseModel, Field

from src.services.product.schemas import ProductResponse
from src.services.size.schemas import SizeResponse


class PriceCreate(BaseModel):
    size_id: int
    product_id: int
    price: float
    proteins: float | None
    fats: float | None
    carbohydrates: float | None
    calories: float | None
    is_custom: bool = False


class PriceResponse(BaseModel):
    price_id: int
    size: SizeResponse
    price: float
    product: ProductResponse
    proteins: float | None
    fats: float | None
    carbohydrates: float | None
    calories: float | None
    is_custom: bool

    class Config:
        from_attributes = True


class PriceUpdate(BaseModel):
    price: float | None = None
    size_id: int | None = None
    proteins: float | None = None
    fats: float | None = None
    carbohydrates: float | None = None
    calories: float | None = None
    is_custom: bool = False


class PriceFilter(BaseModel):
    min_price: int | None = None
    max_price: int | None = None
    min_grams: int | None = None
    max_grams: int | None = None
