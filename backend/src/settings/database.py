from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
import os

env_file = ".env-production" if os.getenv("ENV_FILE") == ".env-production" else ".env"
load_dotenv(env_file)


class DatabaseSettings(BaseSettings):
    host: str = "localhost"
    port: int = 5432
    name: str = "name"
    user: str = "user"
    password: str = "password"
    driver: str = "asyncpg"
    type: str = "postgresql"

    model_config = SettingsConfigDict(env_prefix="db_")

    @property
    def url(self):
        return f"{self.type}+{self.driver}://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"
