from os import getenv

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = getenv("API_TOKEN")
bot = Bot(API_TOKEN, default=DefaultBotProperties(parse_mode='HTML'))

DB_HOST = getenv("DB_HOST")
DB_PORT = getenv("DB_PORT")
DB_NAME = getenv("DB_NAME")
DB_USER = getenv("DB_USER")
DB_PASS = getenv("DB_PASS")

LEXICON_COMMANDS_RU: dict[str, str | None] = {
    '/start': 'start',
    '/cancel': 'cancel',
}

SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")