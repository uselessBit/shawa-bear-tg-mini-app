from os import getenv

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = getenv("API_TOKEN")
bot = Bot(API_TOKEN, default=DefaultBotProperties(parse_mode="HTML"))

# API urls
domain = "backend:8000"
base_api_url = f"http://{domain}/api/v1"
get_user_by_id_url = f"{base_api_url}/users/get_user_by_id"
create_user_url = f"{base_api_url}/users/create_user"
