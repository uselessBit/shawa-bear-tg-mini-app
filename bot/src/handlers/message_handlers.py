import aiohttp
from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

router = Router(name="message_handlers")


@router.message(Command("start"))
async def send_welcome(message: Message) -> None:
    user_id = message.from_user.id

    async with aiohttp.ClientSession() as session:
        async with session.get(
                "http://0.0.0.0:8000/api/v1/users/get_user_by_id",
                params={"user_id": user_id}
        ) as resp:
            if resp.status == 200:
                user = await resp.json()
            else:
                user = None

        if not user:
            user_data = {
                "user_id": message.from_user.id,
                "first_name": message.from_user.first_name,
                "last_name": message.from_user.last_name,
                "username": message.from_user.username,
                "language_code": message.from_user.language_code,
                "coins": 0
            }
            async with session.post(
                    "http://0.0.0.0:8000/api/v1/users/create_user",
                    json=user_data
            ) as resp:
                if resp.status != 201:
                    await message.answer("Ошибка регистрации. Попробуйте позже.")
                    return

    await message.answer("Welcome!")
