from http import HTTPStatus

import aiohttp
from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from src.config import create_user_url, get_user_by_id_url

router = Router(name="message_handlers")


@router.message(Command("start"))
async def send_welcome(message: Message) -> None:
    user_id = message.from_user.id

    async with aiohttp.ClientSession() as session:
        async with session.get(get_user_by_id_url, params={"user_id": user_id}) as resp:
            if resp.status == HTTPStatus.OK:
                user = await resp.json()
            else:
                user = None
        if not user:
            user_data = {
                "user_id": user_id,
                "first_name": message.from_user.first_name,
                "last_name": message.from_user.last_name,
                "username": message.from_user.username,
                "language_code": message.from_user.language_code,
                "coins": 0,
            }
            async with session.post(create_user_url, json=user_data) as response:
                if response.status != HTTPStatus.CREATED:
                    await message.answer("Произошли маленькие технические шоколадки, чутка подождите")
                    return

    await message.answer("Добро пожаловать! Нажмите на кнопку 'Магазин' чтобы перейти в магазин")
