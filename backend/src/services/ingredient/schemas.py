import json
from typing import Any

from pydantic import BaseModel, Field, model_validator


class IngredientCreate(BaseModel):
    name: str
    price: float | None

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data: str) -> dict:
        return json.loads(data)


class IngredientResponse(BaseModel):
    ingredient_id: int
    name: str
    image_url: str | None
    price: float | None

    class Config:
        from_attributes = True


class IngredientUpdate(BaseModel):
    name: str = Field(None)
    price: float | None

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data: str) -> dict[str, Any]:
        return json.loads(data)
