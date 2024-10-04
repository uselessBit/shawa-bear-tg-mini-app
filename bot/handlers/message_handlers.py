from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from api_client import data_get, data_post
from schemas import UserCreate

router = Router(name="message_handlers")


@router.message(Command("start"))
async def send_welcome(message: Message):
    user_create = UserCreate(
        user_id=message.from_user.id,
        first_name=message.from_user.first_name,
        last_name=message.from_user.last_name,
        username=message.from_user.username,
        language_code=message.from_user.language_code,
    )
    user = await data_get(f"https://127.0.0.1:8000/users/get_user_by_id?user_id={user_create.user_id}")
    if not user:
        await data_post("https://127.0.0.1:8000/users/create_user", form_data=user_create)

    await message.answer("Welcome!")
