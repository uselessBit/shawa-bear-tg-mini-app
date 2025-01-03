import json
from typing import Any

from pydantic import BaseModel, Field, model_validator

from src.services.ingredient.schemas import IngredientResponse


class ProductCreate(BaseModel):
    name: str = Field(..., max_length=30)
    description: str
    ingredient_ids: list[int]

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data: Any) -> dict[str, Any]:
        return json.loads(data)


class ProductResponse(BaseModel):
    product_id: int
    name: str
    description: str
    image_url: str | None
    ingredients: list[IngredientResponse]

    class Config:
        from_attributes = True


class ProductUpdate(BaseModel):
    name: str = Field(None)
    description: str = Field(None)
    ingredient_ids: list[int] = Field(None)

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data: Any) -> dict[str, Any]:
        return json.loads(data)