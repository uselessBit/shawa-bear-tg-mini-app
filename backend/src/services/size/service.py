from pydantic import TypeAdapter
from sqlalchemy import select

from src.clients.database.models.size import Size
from src.services.base import BaseService
from src.services.errors import SizeNotFoundError
from src.services.size.interface import SizeServiceI
from src.services.size.schemas import SizeCreate, SizeResponse, SizeUpdate
from src.services.utils import try_commit


class SizeService(BaseService, SizeServiceI):
    async def create(self, size: SizeCreate) -> SizeResponse:
        async with self.session() as session:
            new_size = Size(name=size.name, grams=size.grams)
            session.add(new_size)
            await try_commit(session, size.name)
            type_adapter = TypeAdapter(SizeResponse)
            return type_adapter.validate_python(new_size)


    async def get_all(self) -> list[SizeResponse]:
        async with self.session() as session:
            query = select(Size)
            results = await session.execute(query)
            sizes = results.scalars().all()
            type_adapter = TypeAdapter(list[SizeResponse])
            return type_adapter.validate_python(sizes)

    async def update(self, size_id: int, size_data: SizeUpdate) -> None:
        async with self.session() as session:
            size = await session.get(Size, size_id)
            if size:
                if size_data.name:
                    size.name = size_data.name
                if size_data.grams:
                    size.grams = size_data.grams
                await try_commit(session, size_data.name)
            else:
                raise SizeNotFoundError

    async def delete(self, size_id: int) -> None:
        async with self.session() as session:
            size = await session.get(Size, size_id)
            if not size:
                raise SizeNotFoundError

            await session.delete(size)
            await session.commit()
