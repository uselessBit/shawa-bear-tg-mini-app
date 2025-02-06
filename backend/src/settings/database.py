from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()

class DatabaseSettings(BaseSettings):
    host: str = "localhost"  # use bd_host=0.0.0.0 in env for local development
    port: int = 5432
    name: str = "name"
    user: str = "user"
    password: str = "password"
    driver: str = "asyncpg"
    type: str = "postgresql"

    model_config = SettingsConfigDict(env_prefix="db_")

    @property
    def url(self) -> str:
        return f"{self.type}+{self.driver}://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}"
