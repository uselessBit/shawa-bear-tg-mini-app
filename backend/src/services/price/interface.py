from abc import abstractmethod
from typing import Protocol

from src.services.price.schemas import PriceCreate, PriceFilter, PriceResponse, PriceUpdate


class PriceServiceI(Protocol):
    @abstractmethod
    async def create(self, price_data: PriceCreate) -> PriceResponse: ...

    @abstractmethod
    async def get_all(self) -> list[PriceResponse]: ...

    @abstractmethod
    async def update(self, price_id: int, price_data: PriceUpdate) -> PriceResponse | None: ...

    @abstractmethod
    async def delete(self, price_id: int) -> None: ...

    @abstractmethod
    async def filter_price(self, price_filter: PriceFilter) -> list[PriceResponse]: ...
