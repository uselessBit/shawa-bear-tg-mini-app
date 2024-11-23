from typing import Callable

from src.clients.database.models.ingredient import Ingredient
from src.clients.database.models.product import Product, ProductIngredient
from src.services.ingredient.schemas import IngredientResponse
from src.services.errors import ProductNotFoundError, IngredientNotFoundError
from src.services.product.interface import ProductServiceI, ProductIngredientServiceI
from src.services.product.schemas import ProductResponse, ProductCreate, ProductUpdate
from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from src.services.schemas import Image
from src.services.utils import save_image, delete_image
from sqlalchemy.orm import selectinload


class ProductService(ProductServiceI):
    def __init__(self, session: Callable[..., AsyncSession],
                 product_ingredient_service: ProductIngredientServiceI) -> None:
        self.session = session
        self.product_ingredient_service = product_ingredient_service

    async def create(self, product_data: ProductCreate, image: Image) -> None:
        async with self.session() as session:
            async with session.begin():
                query = select(Ingredient).where(Ingredient.ingredient_id.in_(product_data.ingredient_ids))
                result = await session.execute(query)
                ingredients = result.scalars().all()

                if len(ingredients) != len(product_data.ingredient_ids):
                    missing_ids = set(product_data.ingredient_ids) - {
                        ingredient.ingredient_id for ingredient in ingredients
                    }
                    raise IngredientNotFoundError(f"Ingredients with ids: {missing_ids} not found")

                image_url = await save_image(image, "media/products") if image.filename else None

                new_product = Product(
                    name=product_data.name,
                    description=product_data.description,
                    image_url=image_url,
                )
                session.add(new_product)

            for ingredient_id in product_data.ingredient_ids:
                await self.product_ingredient_service.create(
                    product_id=new_product.product_id,
                    ingredient_id=ingredient_id,
                )

    async def get_all(self) -> list[ProductResponse]:
        async with self.session() as session:
            query = select(Product).options(selectinload(Product.ingredients))
            result = await session.execute(query)
            products = result.scalars().all()

            product_responses = []
            for response_product in products:
                ingredient_responses = [
                    IngredientResponse(
                        ingredient_id=ingredient.ingredient_id,
                        name=ingredient.name,
                        image_url=ingredient.image_url,
                    )
                    for ingredient in response_product.ingredients
                ]

                product_response = ProductResponse(
                    product_id=response_product.product_id,
                    name=response_product.name,
                    description=response_product.description,
                    image_url=response_product.image_url,
                    ingredient_ids=ingredient_responses,
                )
                product_responses.append(product_response)

            return product_responses

    async def get_by_name(self, product_name: str) -> Product:
        async with self.session() as session:
            query = select(Product).where(Product.name == product_name)
            result = await session.execute(query)
            product = result.scalar()
            if product:
                return product
            raise ProductNotFoundError

    async def update(self, product_id: int, product_data: ProductUpdate, image: Image) -> None:
        image_url = await save_image(image, "media/products") if image.filename else None
        async with self.session() as session:
            async with session.begin():
                product = await session.get(Product, product_id)
                if product:
                    if product_data.name:
                        product.name = product_data.name
                    if product_data.description:
                        product.description = product_data.description
                    if product_data.ingredient_ids:
                        await self.product_ingredient_service.update(
                            product_id=product_id,
                            product_data=product_data,
                        )
                    if image_url:
                        if filename := product.image_url:
                            await delete_image(str(filename), "media/products")
                        product.image_url = image_url
                    else:
                        raise ProductNotFoundError


class ProductIngredientService(ProductIngredientServiceI):
    def __init__(self, session: Callable[..., AsyncSession]) -> None:
        self.session = session

    async def create(self, product_id: int, ingredient_id: int) -> None:
        async with self.session() as session:
            async with session.begin():
                new_product_ingredient = ProductIngredient(product_id=product_id, ingredient_id=ingredient_id)
                session.add(new_product_ingredient)

    async def update(self, product_id: int, product_data: ProductUpdate) -> None:
        async with self.session() as session:
            query = delete(ProductIngredient).where(ProductIngredient.product_id == product_id)
            result = await session.execute(query)

            if result.rowcount == 0:
                raise ProductNotFoundError("No products found with the given product_id")

            for ingredient_id in product_data.ingredient_ids:
                new_product_ingredient = ProductIngredient(product_id=product_id, ingredient_id=ingredient_id)
                session.add(new_product_ingredient)
