from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

router = Router(name='message_handlers')


@router.message(Command("start"))
async def send_welcome(message: Message):
    await message.answer(text="Привет, теперь ты можешь запустить tg mini app")
