from fastapi import APIRouter, Depends, HTTPException, status, Response
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.api.products.models import Product
from src.api.products.schemas import ProductCreate, ProductResponse
from src.db import get_session

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/create_product")
async def create_product(product: ProductCreate, db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            new_product = Product(
                name=product.name,
                description=product.description,
                price=product.price,
            )
            session.add(new_product)
        return {"message": "Product created successfuly"}


@router.get("/get_products", response_model=list[ProductResponse])
async def get_products(db: AsyncSession = Depends(get_session)):
    async with db as session:
        async with session.begin():
            query = select(Product)
            results = await session.execute(query)
            products = results.scalars().all()
        return products
