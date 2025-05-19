import json
from typing import Any
import re
from pydantic import BaseModel, Field, model_validator, field_validator


class IngredientCreate(BaseModel):
    name: str
    price: float | None
    color: str | None

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data: str) -> dict:
        return json.loads(data)

    @field_validator("color")
    def validate_color(cls, value: str | None) -> str | None:
        if value is not None:
            if not re.match(r'^#[A-Fa-f0-9]{6}$', value):
                raise ValueError(
                    "Color must be a HEX code starting with '#' followed by 6 hex digits"
                )
        return value


class IngredientResponse(BaseModel):
    ingredient_id: int
    name: str
    image_url: str | None
    price: float | None
    color: str | None

    class Config:
        from_attributes = True


class IngredientUpdate(BaseModel):
    name: str | None
    price: float | None
    color: str | None

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data: str) -> dict[str, Any]:
        return json.loads(data)

    @field_validator("color")
    def validate_color(cls, value: str | None) -> str | None:
        if value is not None:
            if not re.match(r'^#[A-Fa-f0-9]{6}$', value):
                raise ValueError(
                    "Color must be a HEX code starting with '#' followed by 6 hex digits"
                )
        return value
