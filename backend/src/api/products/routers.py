from collections.abc import Sequence
from typing import Any

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.api.products.models import Product
from src.api.products.schemas import ProductCreate, ProductResponse, ProductUpdate
from src.api.products.utils import save_image
from src.db import get_session

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/create_product")
async def create_product(
    product: ProductCreate, file: UploadFile | None = File(None), db: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    if file:
        image_url = await save_image(file)
    else:
        image_url = None
    async with db as session:
        async with session.begin():
            new_product = Product(
                name=product.name, description=product.description, price=product.price, image_url=image_url
            )
            session.add(new_product)
        return {"message": "Product created successfully"}


@router.get("/get_products", response_model=list[ProductResponse])
async def get_products(db: AsyncSession = Depends(get_session)) -> Sequence[Product]:
    async with db as session:
        query = select(Product)
        results = await session.execute(query)
        return results.scalars().all()


@router.get("/get_product_by_name/{product_name}", response_model=ProductResponse)
async def get_product_by_name(product_name: str, db: AsyncSession = Depends(get_session)) -> Product:
    async with db as session:
        query = select(Product).where(product_name == Product.name)
        result = await session.execute(query)
        product = result.scalar()
        if product:
            return product
        raise HTTPException(status_code=404, detail="Product not found")


# Добавить фото
@router.patch("/update_product/{product_id}")
async def update_product(
        product_id: int, product_data: ProductUpdate,
        file: UploadFile | None = File(None),
        db: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    if file:
        image_url = await save_image(file)
    else:
        image_url = None
    async with db as session:
        product = await session.get(Product, product_id)
        if product:
            if product_data.name:
                product.name = product_data.name
            if product_data.description:
                product.description = product_data.description
            if product_data.price:
                product.price = product_data.price
            if image_url:
                product.image_url = image_url

            await session.commit()
            return {"message": "Product updated successfully"}
        raise HTTPException(status_code=404, detail="Product not found")
