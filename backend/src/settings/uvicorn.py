import os
from typing import Literal

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

env_file = ".env-production" if os.getenv("ENV_FILE") == ".env-production" else ".env"
load_dotenv(env_file)


class UvicornSettings(BaseSettings):
    workers: int = 1
    reload: bool = False
    factory: bool = True
    access_log: bool = False
    loop: Literal["none", "auto", "asyncio", "uvloop"] = "asyncio"
    host: str = "0.0.0.0"  # noqa: S104
    port: int = 8000

    model_config = SettingsConfigDict(env_prefix="server_")
