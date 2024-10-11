from typing import Any, Sequence

from fastapi import UploadFile, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.products.models import Product
from src.api.products.schemas import ProductCreate, ProductUpdate
from src.api.products.utils import save_image, delete_image


async def create(product: ProductCreate, file: UploadFile | None, session: AsyncSession) -> dict[str, Any]:
    if file:
        image_url = await save_image(file)
    else:
        image_url = None
    async with session.begin():
        new_product = Product(
            name=product.name, description=product.description, price=product.price, image_url=image_url
        )
        session.add(new_product)
    return {"message": "Product created successfully"}


async def get(session: AsyncSession) -> Sequence[Product]:
    query = select(Product)
    results = await session.execute(query)
    return results.scalars().all()


async def get_by_name(product_name: str, session: AsyncSession) -> Product:
    query = select(Product).where(product_name == Product.name)
    result = await session.execute(query)
    product = result.scalar()
    if product:
        return product
    raise HTTPException(status_code=404, detail="Product not found")


async def update(
        product_id: int, product_data: ProductUpdate,
        file: UploadFile | None,
        session: AsyncSession,
) -> dict[str, Any]:
    image_url = None
    if file:
        image_url = await save_image(file)

    async with session.begin():
        product = await session.get(Product, product_id)
        if product:
            if product_data.name:
                product.name = product_data.name
            if product_data.description:
                product.description = product_data.description
            if product_data.price:
                product.price = product_data.price
            if image_url:
                if filename := product.image_url:
                    await delete_image(filename)
                product.image_url = image_url

            return {"message": "Product updated successfully"}
        raise HTTPException(status_code=404, detail="Product not found")
