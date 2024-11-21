from abc import abstractmethod
from typing import Protocol

from src.services.price.schemas import PriceCreate, PriceResponse, PriceUpdate


class PriceServiceI(Protocol):
    @abstractmethod
    async def create(self, price_data: PriceCreate) -> None:
        ...

    @abstractmethod
    async def get_all(self) -> list[PriceResponse]:
        ...

    @abstractmethod
    async def update(self, price_id: int, price_data: PriceUpdate) -> None:
        ...