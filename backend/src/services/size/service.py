from typing import Callable

from src.services.size.schemas import SizeResponse
from src.clients.database.models.size import Size
from src.services.errors import SizeNotFoundError
from src.services.size.interface import SizeServiceI
from src.services.size.schemas import SizeCreate, SizeUpdate
from sqlalchemy.ext.asyncio import AsyncSession, async_scoped_session
from sqlalchemy import select




class SizeService(SizeServiceI):
    def __init__(self, session: Callable[..., AsyncSession]) -> None:
        self.session = session

    async def create(self, size: SizeCreate) -> None:
        async with self.session() as session:
            new_size = Size(name=size.name, grams=size.grams)
            session.add(new_size)
            await session.commit()

    async def get_all(self) -> list[SizeResponse]:
        async with self.session() as session:
            query = select(Size)
            results = await session.execute(query)
            sizes = results.scalars().all()
            return [SizeResponse(size_id=item.size_id, name=item.name, grams=item.grams)
                    for item in sizes]

    async def update(self, size_id: int, size_data: SizeUpdate) -> None:
        async with self.session() as session:
            size = await session.get(Size, size_id)
            if size:
                if size_data.name:
                    size.name = size_data.name
                if size_data.grams:
                    size.grams = size_data.grams
                await session.commit()
            else:
                raise SizeNotFoundError