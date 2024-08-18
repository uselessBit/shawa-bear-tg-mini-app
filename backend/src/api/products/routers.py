import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.api.products.models import Product
from src.api.products.schemas import ProductCreate, ProductResponse, ProductUpdate
from src.api.products.utils import save_image
from src.db import get_session

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/create_product")
async def create_product(product: ProductCreate, file: UploadFile = File(None), db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():

            new_product = Product(
                name=product.name,
                description=product.description,
                price=product.price,
                image_url=await save_image(file)
            )
            session.add(new_product)
        return {"message": "Product created successfully"}


@router.get("/get_products", response_model=list[ProductResponse])
async def get_products(db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            query = select(Product)
            results = await session.execute(query)
            products = results.scalars().all()
        return products


@router.get("/get_product_by_name/{product_name}", response_model=ProductResponse)
async def get_product_by_name(product_name: str, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(Product).where(product_name == Product.name)
        result = await session.execute(query)
        product = result.scalar()
        if product:
            return product
        else:
            raise HTTPException(status_code=404, detail="Product not found")

# Добавить фото
@router.patch("/update_product/{product_id}")
async def update_product(product_id: int, product_data: ProductUpdate, db: AsyncSession = Depends(get_session)):
    async with db as session:
        product = await session.get(Product, product_id)
        if product:
            if product_data.name:
                product.name = product_data.name
            if product_data.description:
                product.description = product_data.description
            if product_data.price:
                product.price = product_data.price

            await session.commit()
            return {"message": "Product updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Product not found")
