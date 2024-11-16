from typing import Any, Sequence

import sqlalchemy
from fastapi import UploadFile, HTTPException
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import JSONResponse
from sqlalchemy.orm import selectinload
from src.api.products.models import Product, Ingredient, ProductIngredient, Size, Price
from src.api.products.schemas import ProductCreate, ProductUpdate, IngredientCreate, IngredientUpdate, ProductResponse, \
    IngredientResponse, SizeCreate, SizeUpdate, PriceCreate, PriceResponse, PriceUpdate, SizeResponse
from src.api.products.utils import save_image, delete_image


class ProductService:

    @staticmethod
    async def create(product_data: ProductCreate, file: UploadFile | None, session: AsyncSession) -> JSONResponse:
        async with session.begin():
            query = select(Ingredient).where(Ingredient.ingredient_id.in_(product_data.ingredient_ids))
            result = await session.execute(query)
            ingredients = result.scalars().all()

            if len(ingredients) != len(product_data.ingredient_ids):
                missing_ids = set(product_data.ingredient_ids) - {ingredient.ingredient_id for ingredient in ingredients}
                raise HTTPException(status_code=404, detail=f"Ingredients not found with ids: {missing_ids}")

            image_url = await save_image(file) if file else None

            new_product = Product(
                name=product_data.name, description=product_data.description, image_url=image_url
            )
            session.add(new_product)


        for ingredient_id in product_data.ingredient_ids:
            await ProductIngredientService.create(product_id=new_product.product_id,
                                                    ingredient_id=ingredient_id,
                                                    session=session)

        data = {"message": "Product created successfully"}
        return JSONResponse(content=data, status_code=200)


    @staticmethod
    async def get(session: AsyncSession) -> list[ProductResponse]:
        query = select(Product).options(selectinload(Product.ingredients))
        result = await session.execute(query)
        products = result.scalars().all()

        product_responses = []
        for response_product in products:
            ingredient_responses = [
                IngredientResponse(
                    ingredient_id=ingredient.ingredient_id,
                    name=ingredient.name,
                    image_url=ingredient.image_url
                )
                for ingredient in response_product.ingredients
            ]

            product_response = ProductResponse(
                product_id=response_product.product_id,
                name=response_product.name,
                description=response_product.description,
                image_url=response_product.image_url,
                ingredient_ids=ingredient_responses
            )
            product_responses.append(product_response)

        return product_responses

    @staticmethod
    async def get_by_name(product_name: str, session: AsyncSession) -> Product:
        query = select(Product).where(Product.name == product_name)
        result = await session.execute(query)
        product = result.scalar()
        if product:
            return product
        raise HTTPException(status_code=404, detail="Product not found")

    @staticmethod
    async def update(
            product_id: int, product_data: ProductUpdate,
            file: UploadFile | None,
            session: AsyncSession,
    ) -> JSONResponse:
        image_url = await save_image(file) if file else None

        async with session.begin():
            product = await session.get(Product, product_id)
            if product:
                if product_data.name:
                    product.name = product_data.name
                if product_data.description:
                    product.description = product_data.description
                if product_data.ingredient_ids:
                    await ProductIngredientService.update(product_id=product_id,
                                                          product_data=product_data,
                                                          session=session)
                if image_url:
                    if filename := product.image_url:
                        await delete_image(filename)
                    product.image_url = image_url

                data = {"message": "Product updated successfully"}
                return JSONResponse(content=data, status_code=200)
            raise HTTPException(status_code=404, detail="Product not found")


class ProductIngredientService:
    @staticmethod
    async def create(product_id: int, ingredient_id: int, session: AsyncSession) -> Any:
        async with session.begin():
            new_product_ingredient = ProductIngredient(product_id=product_id, ingredient_id=ingredient_id)
            session.add(new_product_ingredient)

    @staticmethod
    async def update(product_id: int, product_data: ProductUpdate, session: AsyncSession) -> Any:
        query = delete(ProductIngredient).where(ProductIngredient.product_id == product_id)
        result = await session.execute(query)

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="No products found with the given product_id")

        for ingredient_id in product_data.ingredient_ids:
            new_product_ingredient = ProductIngredient(product_id=product_id, ingredient_id=ingredient_id)
            session.add(new_product_ingredient)


class IngredientService:
    @staticmethod
    async def create(ingredient: IngredientCreate, file: UploadFile | None, session: AsyncSession) -> JSONResponse:
        image_url = await save_image(file) if file else None
        async with session.begin():
            new_ingredient = Ingredient(name=ingredient.name, image_url=image_url)
            session.add(new_ingredient)

        data = {"message": "Ingredient created successfully"}
        return JSONResponse(content=data, status_code=200)

    @staticmethod
    async def get(session: AsyncSession) -> Sequence[Ingredient]:
        query = select(Ingredient)
        results = await session.execute(query)
        return results.scalars().all()

    @staticmethod
    async def update(ingredient_id: int,
                     ingredient_data: IngredientUpdate,
                     file: UploadFile | None,
                     session: AsyncSession) -> JSONResponse:
        image_url = await save_image(file) if file else None

        async with session.begin():
            ingredient = await session.get(Ingredient, ingredient_id)
            if ingredient:
                if ingredient_data.name:
                    ingredient.name = ingredient_data.name
                if image_url:
                    if filename := ingredient.image_url:
                        await delete_image(filename)
                    ingredient.image_url = image_url

                data = {"message": "Ingredient updated successfully"}
                return JSONResponse(content=data, status_code=200)
            raise HTTPException(status_code=404, detail="Ingredient not found")


class SizeService:
    @staticmethod
    async def create(size: SizeCreate, session: AsyncSession) -> JSONResponse:
        async with session.begin():
            new_size = Size(name=size.name, grams=size.grams)
            session.add(new_size)
        data = {"message": "Size created successfully"}
        return JSONResponse(content=data, status_code=200)

    @staticmethod
    async def get(session: AsyncSession) -> Sequence[Size]:
        query = select(Size)
        results = await session.execute(query)
        return results.scalars().all()

    @staticmethod
    async def update(size_id: int, size_data: SizeUpdate, session: AsyncSession) -> JSONResponse:
        async with session.begin():
            size = await session.get(Size, size_id)
            if size:
                if size_data.name:
                    size.name = size_data.name
                if size_data.grams:
                    size.grams = size_data.grams
                data = {"message": "Size updated successfully"}
                return JSONResponse(content=data, status_code=200)
            raise HTTPException(status_code=404, detail="Size not found")

class PriceService:
    @staticmethod
    async def create(price_data: PriceCreate, session: AsyncSession) -> JSONResponse:
        async with session.begin():
            query = select(Product).where(Product.product_id == price_data.product_id)
            result = await session.execute(query)
            product = result.scalar_one_or_none()
            if not product:
                HTTPException(status_code=404, detail=f"Product with id {price_data.product_id} not found")

            query = select(Size).where(Size.size_id == price_data.size_id)
            result = await session.execute(query)
            size = result.scalar_one_or_none()
            if not size:
                HTTPException(status_code=404, detail=f"Size with id {price_data.size_id} not found")

            price = Price(size_id=price_data.size_id, product_id=price_data.product_id, price=price_data.price)
            session.add(price)
        data = {"message": "Price created successfully"}
        return JSONResponse(content=data, status_code=200)



    @staticmethod
    async def get(session: AsyncSession) -> list[PriceResponse]:
        query = select(Price).options(selectinload(Price.product).selectinload(Product.ingredients), selectinload(Price.size))
        result = await session.execute(query)
        prices = result.scalars().all()

        # b = [IngredientResponse.model_validate(ingredient, from_attributes=True) for ingredient in prices[0].product.ingredients]
        price_responses = []
        for price in prices:
            price_response = PriceResponse(
                price_id=price.price_id,
                size=SizeResponse(
                    size_id=price.size.size_id,
                    name=price.size.name,
                    grams=price.size.grams
                ),
                products=ProductResponse(
                    product_id=price.product.product_id,
                    name=price.product.name,
                    description=price.product.description,
                    image_url=price.product.image_url,
                    ingredient_ids=[IngredientResponse(
                        ingredient_id=ingredient.ingredient_id,
                        name=ingredient.name,
                        image_url=ingredient.image_url
                    ) for ingredient in price.product.ingredients]
                ),
                price=price.price
            )
            price_responses.append(price_response)

        return price_responses


    @staticmethod
    async def update(price_id: int, price_data: PriceUpdate, session: AsyncSession) -> JSONResponse:
        async with session.begin():
            price = await session.get(Price, price_id)
            if price:
                if price_data.price:
                    price.price = price_data.price
                data = {"message": "Price updated successfully"}
                return JSONResponse(content=data, status_code=200)
            raise HTTPException(status_code=404, detail="Price not found")