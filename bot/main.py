import asyncio
import logging
import sys

from aiogram import Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage
from config import bot
from handlers.message_handlers import router as message_router

storage = MemoryStorage()


async def main() -> None:
    dp = Dispatcher(storage=storage)
    dp.include_router(message_router)
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)

    asyncio.run(main())
