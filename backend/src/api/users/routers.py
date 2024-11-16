from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.users.schemas import UserCreate, UserResponse
from src.api.users.services import create, get_by_id
from src.database import get_session

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create_user")
async def create_user(
    user: UserCreate, db: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    return await create(user, db)


@router.get("/get_user_by_id", response_model=UserResponse)
async def get_user_by_id(
    user_id: int, db: AsyncSession = Depends(get_session)
) -> UserResponse:
    return await get_by_id(user_id, db)
