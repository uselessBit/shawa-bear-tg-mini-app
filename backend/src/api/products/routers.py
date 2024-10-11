from collections.abc import Sequence
from typing import Any

from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.products.models import Product
from src.api.products.schemas import ProductCreate, ProductResponse, ProductUpdate
from src.api.products.service import create, get, get_by_name, update
from src.database import get_session

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/create_product")
async def create_product(
        product: ProductCreate, file: UploadFile | None = File(None), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    return await create(product, file, session)


@router.get("/get_products", response_model=list[ProductResponse])
async def get_products(session: AsyncSession = Depends(get_session)) -> Sequence[Product]:
    return await get(session)


@router.get("/get_product_by_name/{product_name}", response_model=ProductResponse)
async def get_product_by_name(product_name: str, session: AsyncSession = Depends(get_session)) -> Product:
    return await get_by_name(product_name, session)


@router.patch("/update_product/{product_id}")
async def update_product(
        product_id: int,
        product_data: ProductUpdate,
        file: UploadFile | None = File(None),
        session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    return await update(product_id, product_data, file, session)
