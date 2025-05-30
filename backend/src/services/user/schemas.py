from pydantic import BaseModel


class UserCreate(BaseModel):
    user_id: int
    first_name: str | None = None
    last_name: str | None = None
    username: str | None = None
    language_code: str | None = None
    coins: int | None = None


class UserResponse(BaseModel):
    user_id: int
    first_name: str | None
    last_name: str | None
    username: str | None
    language_code: str | None
    coins: int | None

    class Config:
        from_attributes = True
