from typing import Any

from fastapi import Depends, HTTPException
from sqlalchemy import Select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.users.models import User
from src.api.users.schemas import UserCreate, UserResponse
from src.db import get_session


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
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
    return user