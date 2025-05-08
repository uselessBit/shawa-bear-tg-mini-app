from pydantic import TypeAdapter
from sqlalchemy import select

from src.clients.database.models.category import Category
from src.services.base import BaseService
from src.services.category.interface import CategoryServiceI
from src.services.category.schemas import CategoryCreate, CategoryResponse, CategoryUpdate
from src.services.errors import CategoryNotFoundError
from src.services.utils import try_commit


class CategoryService(BaseService, CategoryServiceI):
    async def create(self, category: CategoryCreate) -> None:
        async with self.session() as session:
            new_category = Category(name=category.name)
            session.add(new_category)
            await try_commit(session, category.name)

    async def get_all(self) -> list[CategoryResponse]:
        async with self.session() as session:
            query = select(Category)
            results = await session.execute(query)
            categories = results.scalars().all()
            type_adapter = TypeAdapter(list[CategoryResponse])
            return type_adapter.validate_python(categories)

    async def update(self, category_id: int, category_data: CategoryUpdate) -> None:
        async with self.session() as session:
            category = await session.get(Category, category_id)
            if category:
                if category_data.name:
                    category.name = category_data.name
                await try_commit(session, category_data.name)
            else:
                raise CategoryNotFoundError

    async def delete(self, category_id: int) -> None:
        async with self.session() as session:
            category = await session.get(Category, category_id)
            if not category:
                raise CategoryNotFoundError

            await session.delete(category)
            await session.commit()
