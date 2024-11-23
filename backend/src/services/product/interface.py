from abc import abstractmethod
from typing import Protocol, Sequence

from src.services.product.schemas import ProductUpdate
from src.clients.database.models.product import Product
from src.services.product.schemas import ProductResponse, ProductCreate
from fastapi import UploadFile

from src.services.schemas import Image


class ProductServiceI(Protocol):
    @abstractmethod
    async def create(self, product_data: ProductCreate, image: Image) -> None:
        ...

    @abstractmethod
    async def get_all(self) -> list[ProductResponse]:
        ...

    @abstractmethod
    async def get_by_name(self, product_name: str) -> Product:
        ...

    @abstractmethod
    async def update(self, product_id: int, product_data: ProductUpdate, image: Image) -> None:
        ...


class ProductIngredientServiceI(Protocol):
    @abstractmethod
    async def create(self, product_id: int, ingredient_id: int) -> None:
        ...

    @abstractmethod
    async def update(self, product_id: int, product_data: ProductUpdate) -> None:
        ...