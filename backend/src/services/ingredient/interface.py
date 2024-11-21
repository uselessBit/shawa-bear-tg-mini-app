from abc import abstractmethod
from typing import Protocol, Sequence
from fastapi import UploadFile
from src.clients.database.models.ingredient import Ingredient
from src.services.ingredient.schemas import IngredientCreate, IngredientUpdate, IngredientResponse


class IngredientServiceI(Protocol):
    @abstractmethod
    async def create(self, ingredient: IngredientCreate, file: UploadFile | None) -> None:
        ...

    @abstractmethod
    async def get(self) -> list[IngredientResponse]:
        ...

    @abstractmethod
    async def update(self, ingredient_id: int, ingredient_data: IngredientUpdate, file: UploadFile | None) -> None:
        ...