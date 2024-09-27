import json

from pydantic import BaseModel, Field, model_validator


class ProductCreate(BaseModel):
    name: str = Field(..., max_length=30)
    description: str = ...
    price: int = ...

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data):
        return json.loads(data)


class ProductResponse(BaseModel):
    product_id: int
    name: str
    description: str
    price: int
    image_url: str


class ProductUpdate(BaseModel):
    name: str = Field(None)
    description: str = Field(None)
    price: int = Field(None)

    @model_validator(mode="before")
    @classmethod
    def to_py_dict(cls, data):
        return json.loads(data)
