from abc import abstractmethod
from typing import Protocol

from src.services.user.schemas import UserCreate, UserResponse


class UserServiceI(Protocol):
    @abstractmethod
    async def create(self, user: UserCreate) -> None:
        ...

    @abstractmethod
    async def get_by_id(self, user_id: int) -> UserResponse:
        ...
