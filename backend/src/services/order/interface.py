from abc import abstractmethod
from typing import Protocol

from src.services.order.schemas import OrderCreate, OrderResponse, OrderStatus


class OrderServiceI(Protocol):
    @abstractmethod
    async def create_order(self, order_data: OrderCreate) -> None: ...

    @abstractmethod
    async def get_order(self, order_id: int) -> OrderResponse: ...

    @abstractmethod
    async def get_all(self) -> list[OrderResponse]: ...

    @abstractmethod
    async def change_status(self, order_id: int, status: OrderStatus) -> None: ...
