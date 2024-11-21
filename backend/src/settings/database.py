from pydantic_settings import BaseSettings, SettingsConfigDict


class DatabaseSettings(BaseSettings):
    host: str = "localhost"
    port: int = 5432
    name: str = "mini_app"
    user: str = "postgres"
    password: str = "admin"
    driver: str = "asyncpg"
    type: str = "postgresql"
    url: str = f"{type}+{driver}://{user}:{password}@{host}:{port}/{name}"

    model_config = SettingsConfigDict(env_prefix="db_")
