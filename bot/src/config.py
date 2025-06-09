from os import getenv

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = getenv("API_TOKEN")
bot = Bot(API_TOKEN, default=DefaultBotProperties(parse_mode="HTML"))

# API urls
host = getenv("BACKEND_HOST")
base_api_url = f"{host}/api/v1"
get_user_by_id_url = f"{base_api_url}/users/get_user_by_id"
create_user_url = f"{base_api_url}/users/create_user"
