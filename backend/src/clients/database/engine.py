from collections.abc import AsyncGenerator
from asyncio import current_task
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
    async_scoped_session
)

from src.settings.database import DatabaseSettings


def async_engine(database_settings: DatabaseSettings) -> AsyncEngine:
    return create_async_engine(url=database_settings.url, echo=True)


class Database:
    def __init__(self, engine: AsyncEngine) -> None:
        self.engine = engine
        self._session_factory = async_sessionmaker(self.engine, expire_on_commit=False)

    def get_session(self) -> async_scoped_session[AsyncSession]:
        return async_scoped_session(self._session_factory, scopefunc=current_task)


# alembic revision --autogenerate -m 'initial'
# alembic upgrade head