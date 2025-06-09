# src/app.py
import logging
import sys

from aiogram import Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage

from src.config import bot
from src.handlers.message_handlers import router as message_router

async def start_polling() -> None:
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    storage = MemoryStorage()
    dp = Dispatcher(storage=storage)
    dp.include_router(message_router)
    await dp.start_polling(bot)