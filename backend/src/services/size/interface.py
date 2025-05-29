from abc import abstractmethod
from typing import Protocol

from src.services.size.schemas import SizeCreate, SizeResponse, SizeUpdate


class SizeServiceI(Protocol):
    @abstractmethod
    async def create(self, size: SizeCreate) -> SizeResponse:
        ...

    @abstractmethod
    async def get_all(self) -> list[SizeResponse]:
        ...

    @abstractmethod
    async def update(self, size_id: int, size_data: SizeUpdate) -> None:
        ...

    @abstractmethod
    async def delete(self, size_id: int) -> None:
        ...