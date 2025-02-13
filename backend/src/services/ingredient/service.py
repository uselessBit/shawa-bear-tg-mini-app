from pydantic import TypeAdapter
from sqlalchemy import select

from src.clients.database.models.ingredient import Ingredient
from src.services.base import BaseService
from src.services.errors import IngredientNotFoundError
from src.services.ingredient.interface import IngredientServiceI
from src.services.ingredient.schemas import IngredientCreate, IngredientResponse, IngredientUpdate
from src.services.schemas import Image
from src.services.static import ingredients_path
from src.services.utils import delete_image, save_image, try_commit


class IngredientService(BaseService, IngredientServiceI):
    async def create(self, ingredient: IngredientCreate, image: Image) -> None:
        async with self.session() as session:
            image_url = await save_image(image, ingredients_path) if image.filename else None
            new_ingredient = Ingredient(name=ingredient.name, image_url=image_url)
            session.add(new_ingredient)
            await try_commit(session, ingredient.name, delete_image, ingredients_path)

    async def get(self) -> list[IngredientResponse]:
        async with self.session() as session:
            query = select(Ingredient)
            results = await session.execute(query)
            ingredients = results.scalars().all()
            type_adapter = TypeAdapter(list[IngredientResponse])
            return type_adapter.validate_python(ingredients)

    async def update(self, ingredient_id: int, ingredient_data: IngredientUpdate, image: Image) -> None:
        async with self.session() as session:
            image_url = await save_image(image, ingredients_path) if image.filename else None

            ingredient = await session.get(Ingredient, ingredient_id)
            if ingredient:
                if ingredient_data.name:
                    ingredient.name = ingredient_data.name
                if image_url:
                    if filename := ingredient.image_url:
                        await delete_image(str(filename), ingredients_path)
                    ingredient.image_url = image_url
                await try_commit(session, ingredient.name, delete_image, ingredients_path)
            else:
                raise IngredientNotFoundError

    async def delete(self, ingredient_id: int) -> None:
        async with self.session() as session:
            ingredient = await session.get(Ingredient, ingredient_id)
            if not ingredient:
                raise IngredientNotFoundError
            if filename := ingredient.image_url:
                await delete_image(str(filename), ingredients_path)
            await session.delete(ingredient)
            await session.commit()
