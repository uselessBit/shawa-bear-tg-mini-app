from abc import abstractmethod
from typing import Protocol

from src.services.product.schemas import ProductCreate, ProductResponse, ProductUpdate
from src.services.schemas import Image


class ProductServiceI(Protocol):
    @abstractmethod
    async def create(self, product_data: ProductCreate, image: Image) -> None: ...

    @abstractmethod
    async def get_all(self) -> list[ProductResponse]: ...

    @abstractmethod
    async def get_by_name(self, product_name: str) -> ProductResponse: ...

    @abstractmethod
    async def update(self, product_id: int, product_data: ProductUpdate, image: Image) -> None: ...

    @abstractmethod
    async def delete(self, product_id: int) -> None: ...


class ProductIngredientServiceI(Protocol):
    @abstractmethod
    async def create(self, product_id: int, ingredient_id: int) -> None: ...

    @abstractmethod
    async def update(self, product_id: int, product_data: ProductUpdate) -> None: ...
