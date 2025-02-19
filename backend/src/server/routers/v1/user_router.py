from http import HTTPStatus

from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.static import create_message
from src.services.user.interface import UserServiceI
from src.services.user.schemas import UserCreate, UserResponse

user_tag = "Users"
router = APIRouter(prefix="/users", tags=[user_tag])


async def get_user_service() -> UserServiceI:
    return container.user_service()


@router.post("/create_user")
async def create_user(
    user: UserCreate,
    user_service: UserServiceI = Depends(get_user_service),
) -> JSONResponse:
    await user_service.create(user)
    return JSONResponse(content={"message": create_message.format(entity=user_tag)}, status_code=HTTPStatus.CREATED)


@router.get("/get_user_by_id", response_model=UserResponse)
async def get_user_by_id(
    user_id: int,
    user_service: UserServiceI = Depends(get_user_service),
) -> UserResponse:
    return await user_service.get_by_id(user_id)
