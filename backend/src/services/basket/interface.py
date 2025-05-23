from abc import abstractmethod
from typing import Protocol

from src.services.basket.schemas import BasketItemCreate, BasketResponse, QuantityUpdate


class BasketServiceI(Protocol):
    @abstractmethod
    async def get_user_basket(self, user_id: int) -> BasketResponse: ...

    @abstractmethod
    async def add_item(self, user_id: int, item_data: BasketItemCreate) -> None: ...

    @abstractmethod
    async def remove_item(self, basket_item_id: int) -> None: ...

    @abstractmethod
    async def clear_basket(self, basket_id: int) -> None: ...

    @abstractmethod
    async def change_quantity(self, quantity_update: QuantityUpdate) -> None: ...