from typing import Any

from sqlalchemy import Select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.users.models import User
from src.api.users.schemas import UserCreate, UserResponse


async def create(user: UserCreate, db: AsyncSession) -> dict[str, Any]:
    async with db.begin():
        new_user = User(
            user_id=user.user_id,
            first_name=user.first_name,
            last_name=user.last_name,
            username=user.username,
            language_code=user.language_code,
        )
        db.add(new_user)
        return {"message": "User created successfully"}


async def get_by_id(user_id: int, db: AsyncSession) -> UserResponse:
    async with db.begin():
        query = Select(User).where(user_id == User.user_id)
        result = await db.execute(query)
        user = result.scalar_one_or_none()
    return user
