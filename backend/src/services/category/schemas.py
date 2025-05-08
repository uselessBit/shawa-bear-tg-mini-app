from pydantic import BaseModel, Field


class CategoryCreate(BaseModel):
    name: str

class CategoryResponse(BaseModel):
    category_id: int
    name: str

    class Config:
        from_attributes = True

class CategoryUpdate(BaseModel):
    name: str = Field(None)
