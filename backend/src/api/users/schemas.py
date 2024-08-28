from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    username: str
    language_code: str


