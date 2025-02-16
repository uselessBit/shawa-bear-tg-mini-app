from abc import abstractmethod
from typing import Protocol

from src.services.ingredient.schemas import IngredientCreate, IngredientResponse, IngredientUpdate
from src.services.schemas import Image


class IngredientServiceI(Protocol):
    @abstractmethod
    async def create(self, ingredient: IngredientCreate, image: Image) -> None:
        ...

    @abstractmethod
    async def get(self) -> list[IngredientResponse]:
        ...

    @abstractmethod
    async def update(self, ingredient_id: int, ingredient_data: IngredientUpdate, image: Image) -> None:
        ...

    @abstractmethod
    async def delete(self, ingredient_id: int) -> None:
        ...