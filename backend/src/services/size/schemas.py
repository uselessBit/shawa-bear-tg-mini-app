from pydantic import BaseModel, Field

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