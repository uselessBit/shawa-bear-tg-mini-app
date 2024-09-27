from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy import Select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.users.models import User
from src.api.users.schemas import UserCreate
from src.db import get_session

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create_user")
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_session)) -> dict[str, Any]:
    async with db as session:
        async with session.begin():
            new_user = User(
                user_id=user.user_id,
                first_name=user.first_name,
                last_name=user.last_name,
                username=user.username,
                language_code=user.language_code,
            )
            session.add(new_user)
        return {"message": "User created successfully"}


@router.get("/get_user_by_id")
async def get_user_by_id(user_id: int, db: AsyncSession = Depends(get_session)) -> dict[str, Any]:
    async with db as session:
        async with session.begin():
            query = Select(User).where(user_id == User.user_id)
            result = await session.execute(query)
            user = result.scalar_one_or_none()
        return {"user": user}
