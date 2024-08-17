from datetime import datetime, timedelta

from fastapi import Response, HTTPException, Depends
from jose import jwt
from pydantic import EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request

from src.config import ALGORITHM, SECRET_KEY
from src.db import get_session
from src.api.users.models import User


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def token_to_cookie(user_email: EmailStr, response: Response):
    access_token = create_access_token(data={"sub": user_email})
    token_expires = timedelta(minutes=30)
    response.set_cookie(key="access_token", value=f"{access_token}", httponly=True,
                        expires=int(token_expires.total_seconds()), max_age=int(token_expires.total_seconds()),
                        secure=True,
                        samesite="none", )
    return access_token


async def get_token_from_cookie(request: Request):
    jwt_token = request.cookies.get("access_token")
    if not jwt_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return jwt_token


def verify_jwt_token(token: str):
    try:
        decoded_data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_data
    except jwt.ExpiredSignatureError:
        return None


async def get_current_user(token: str = Depends(get_token_from_cookie), db: AsyncSession = Depends(get_session)):
    decoded_data = verify_jwt_token(token)
    if not decoded_data:
        raise HTTPException(status_code=400, detail="Invalid token")

    async with db as session:
        async with session.begin():
            query = select(User).where(User.email == decoded_data["sub"])
            result = await session.execute(query)
            user = result.scalar_one()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
