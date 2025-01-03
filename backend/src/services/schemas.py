from pydantic import BaseModel, Field


class Image(BaseModel):
    file_bytes: bytes | None = Field(None)
    filename: str | None = Field(None)
