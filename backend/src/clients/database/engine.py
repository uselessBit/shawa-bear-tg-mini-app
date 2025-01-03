from asyncio import current_task
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_scoped_session,
    async_sessionmaker,
    create_async_engine,
)

from src.settings.database import DatabaseSettings


def async_engine(database_settings: DatabaseSettings) -> AsyncEngine:
    return create_async_engine(url=database_settings.url, echo=True)


class Database:
    def __init__(self, engine: AsyncEngine) -> None:
        self.engine = engine
        self.session = async_scoped_session(
            async_sessionmaker(self.engine, expire_on_commit=False), scopefunc=current_task
        )

    @asynccontextmanager
    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        async with self.session() as session:
            yield session


# alembic revision --autogenerate -m 'initial'
# alembic upgrade head
