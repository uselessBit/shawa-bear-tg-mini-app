from collections.abc import Callable

from sqlalchemy.ext.asyncio import AsyncSession


class BaseService:
    def __init__(self, session: Callable[..., AsyncSession]) -> None:
        self.session = session
