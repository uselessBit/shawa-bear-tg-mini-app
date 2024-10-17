import json

from pydantic import BaseModel, Field, model_validator


class IngredientCreate(BaseModel):
    name: str

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data):
        return json.loads(data)


class IngredientResponse(BaseModel):
    ingredient_id: int
    name: str
    image_url: str | None


class IngredientUpdate(BaseModel):
    name: str = Field(None)

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data):
        return json.loads(data)


class ProductCreate(BaseModel):
    name: str = Field(..., max_length=30)
    description: str
    ingredient_ids: list[int]

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data):
        return json.loads(data)


class ProductResponse(BaseModel):
    product_id: int
    name: str
    description: str
    image_url: str
    ingredient_ids: list[IngredientResponse]


class ProductUpdate(BaseModel):
    name: str = Field(None)
    description: str = Field(None)
    ingredient_ids: list[int] = Field(None)

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data):
        return json.loads(data)


class SizeCreate(BaseModel):
    name: str
    grams: int


class SizeResponse(BaseModel):
    size_id: int
    name: str
    grams: int


class SizeUpdate(BaseModel):
    name: str = Field(None)
    grams: int = Field(None)


class PriceCreate(BaseModel):
    size_id: int
    product_id: int
    price: float


class PriceResponse(BaseModel):
    price_id: int
    size_id: int
    product_id: int
    price: float


class PriceUpdate(BaseModel):
    size_id: int
    product_id: int
    price: float
