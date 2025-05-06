from abc import abstractmethod
from typing import Protocol

from src.services.category.schemas import CategoryCreate, CategoryResponse, CategoryUpdate


class CategoryServiceI(Protocol):
    @abstractmethod
    async def create(self, size: CategoryCreate) -> None:
        ...

    @abstractmethod
    async def get_all(self) -> list[CategoryResponse]:
        ...

    @abstractmethod
    async def update(self, size_id: int, size_data: CategoryUpdate) -> None:
        ...

    @abstractmethod
    async def delete(self, size_id: int) -> None:
        ...