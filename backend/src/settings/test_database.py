from pydantic_settings import BaseSettings, SettingsConfigDict


class TestDatabaseSettings(BaseSettings):
    host: str = "localhost"
    port: int = 5432
    name: str = "default"
    user: str = "root"
    password: str = "password"
    driver: str = "asyncpg"
    type: str = "postgresql"
    url: str = f"{type}+{driver}://{user}:{password}@{host}:{port}/{name}"

    model_config = SettingsConfigDict(env_prefix="test_db_")
