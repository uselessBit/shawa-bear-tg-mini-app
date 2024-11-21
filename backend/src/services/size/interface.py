from abc import abstractmethod
from typing import Protocol

from src.services.size.schemas import SizeCreate, SizeUpdate, SizeResponse


class SizeServiceI(Protocol):
    @abstractmethod
    async def create(self, size: SizeCreate) -> None:
        ...

    @abstractmethod
    async def get_all(self) -> list[SizeResponse]:
        ...

    @abstractmethod
    async def update(self, size_id: int, size_data: SizeUpdate) -> None:
        ...