from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from src.api.users.routers import create_user, get_user_by_id
from src.api.users.schemas import UserCreate
from src.db import get_session

router = Router(name='message_handlers')


@router.message(Command("start"))
async def send_welcome(message: Message):
    user_create = UserCreate(
        user_id=message.from_user.id,
        first_name=message.from_user.first_name,
        last_name=message.from_user.last_name,
        username=message.from_user.username,
        language_code=message.from_user.language_code,
    )
    async for session in get_session():
        user = await get_user_by_id(message.from_user.id, session)
        if not user["user"]:
            await create_user(user=user_create, db=session)
    await message.answer("Welcome!")
