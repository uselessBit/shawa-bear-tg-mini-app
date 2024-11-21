from typing import Sequence, Callable
from fastapi import UploadFile
from src.clients.database.models.ingredient import Ingredient
from src.services.errors import IngredientNotFoundError
from src.services.ingredient.interface import IngredientServiceI
from src.services.ingredient.schemas import IngredientCreate, IngredientUpdate, IngredientResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.services.utils import delete_image, save_image


class IngredientService(IngredientServiceI):
    def __init__(self, session: Callable[..., AsyncSession]) -> None:
        self.session = session

    async def create(self, ingredient: IngredientCreate, file: UploadFile | None) -> None:
        async with self.session() as session:
            image_url = await save_image(file) if file else None
            async with session.begin():
                new_ingredient = Ingredient(name=ingredient.name, image_url=image_url)
                session.add(new_ingredient)

    async def get(self) -> list[IngredientResponse]:
        async with self.session() as session:
            query = select(Ingredient)
            results = await session.execute(query)
            ingredients = results.scalars().all()
            return [IngredientResponse(ingredient_id=item.ingredient_id, name=item.name, image_url=item.image_url)
                    for item in ingredients]

    async def update(self, ingredient_id: int, ingredient_data: IngredientUpdate, file: UploadFile | None) -> None:
        async with self.session() as session:
            image_url = await save_image(file) if file else None

            async with session.begin():
                ingredient = await session.get(Ingredient, ingredient_id)
                if ingredient:
                    if ingredient_data.name:
                        ingredient.name = ingredient_data.name
                    if image_url:
                        if filename := ingredient.image_url:
                            await delete_image(str(filename))
                        ingredient.image_url = image_url
                else:
                    raise IngredientNotFoundError