from os import getenv

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = getenv("API_TOKEN")
bot = Bot(API_TOKEN, default=DefaultBotProperties(parse_mode="HTML"))
