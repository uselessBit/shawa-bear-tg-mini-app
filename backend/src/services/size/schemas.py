from pydantic import BaseModel, Field

class SizeCreate(BaseModel):
    name: str
    grams: int


class SizeResponse(BaseModel):
    size_id: int
    name: str
    grams: int

    class Config:
        from_attributes = True


class SizeUpdate(BaseModel):
    name: str = Field(None)
    grams: int = Field(None)