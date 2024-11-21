from fastapi import APIRouter, Depends
from dependency_injector.wiring import Provide, inject
from starlette.responses import JSONResponse
from src.container import DependencyContainer
from src.services.user.interface import UserServiceI
from src.services.user.schemas import UserResponse, UserCreate

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create_user")
@inject
async def create_user(
        user: UserCreate,
        user_service: UserServiceI = Depends(Provide[DependencyContainer.user_service]),
) -> JSONResponse:
    await user_service.create(user)
    return JSONResponse(content={"message": "User created successfully"}, status_code=200)


@router.get("/get_user_by_id", response_model=UserResponse)
@inject
async def get_user_by_id(
        user_id: int,
        user_service: UserServiceI = Depends(Provide[DependencyContainer.user_service]),
) -> UserResponse:
    return await user_service.get_by_id(user_id)