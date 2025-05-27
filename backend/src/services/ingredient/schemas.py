import json
from enum import StrEnum
from typing import Any
import re
from pydantic import BaseModel, Field, model_validator, field_validator


class IngredientType(StrEnum):
    BASE = "base"
    SAUCE = "sauce"
    MEAT = "meat"
    EXTRAS = "extras"


class IngredientCreate(BaseModel):
    name: str
    price: float | None
    color: str | None
    type: IngredientType | None

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
    type: IngredientType | None

    class Config:
        from_attributes = True


class IngredientUpdate(BaseModel):
    name: str | None = Field(None)
    price: float | None= Field(None)
    color: str | None= Field(None)
    type: IngredientType | None= Field(None)

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
