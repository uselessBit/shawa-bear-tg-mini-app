from fastapi import APIRouter, Depends, HTTPException, status, Response
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.db import get_session
from src.api.users.models import User
from src.api.users.auth import token_to_cookie, get_current_user
from src.api.users.schemas import UserCreate, UserLogin

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
async def register_user(response: Response, user: UserCreate, db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            new_user = User(
                first_name=user.first_name,
                last_name=user.last_name,
                email=user.email,
                hashed_password=pwd_context.hash(user.password)
            )
            session.add(new_user)
            # await session.flush()

        token = token_to_cookie(user.email, response)
        # return {"message": "User created successfully", "token": token, "token_type": "bearer"}
        return {"message": "User created successfully"}


@router.post("/login")
async def login_user(response: Response, form_data: UserLogin,
                     db: AsyncSession = Depends(get_session)):
    async with db as session:
        result = await session.execute(select(User).where(form_data.email == User.email))
        user_in_db = result.scalar_one_or_none()

        if user_in_db and pwd_context.verify(form_data.password, user_in_db.hashed_password):
            token = token_to_cookie(form_data.email, response)
            # return {"message": "Logged in successfully", "token": token, "token_type": "bearer"}
            return {"message": "Logged in successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )


@router.get("/me")
def get_user_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie(key="access_token", httponly=True, secure=True, samesite="none")
    return {"message": "Logged out successfully"}
