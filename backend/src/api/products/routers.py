from collections.abc import Sequence
from typing import Any

from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import JSONResponse

from src.api.products.models import Product, Ingredient
from src.api.products.schemas import ProductCreate, ProductResponse, ProductUpdate, IngredientCreate, \
    IngredientResponse, IngredientUpdate
from src.api.products.services import ProductService, IngredientService
from src.database import get_session

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/create_product")
async def create_product(
        product: ProductCreate, file: UploadFile | None = File(None), session: AsyncSession = Depends(get_session)
) -> JSONResponse:
    return await ProductService.create(product, file, session)


@router.get("/get_products", response_model=list[ProductResponse])
async def get_products(session: AsyncSession = Depends(get_session)) -> list[ProductResponse]:
    return await ProductService.get(session)


@router.get("/get_product_by_name/{product_name}", response_model=ProductResponse)
async def get_product_by_name(product_name: str, session: AsyncSession = Depends(get_session)) -> Product:
    return await ProductService.get_by_name(product_name, session)


@router.patch("/update_product/{product_id}")
async def update_product(
        product_id: int,
        product_data: ProductUpdate,
        file: UploadFile | None = File(None),
        session: AsyncSession = Depends(get_session),
) -> JSONResponse:
    return await ProductService.update(product_id, product_data, file, session)

@router.post("/create_ingredient")
async def create_ingredient(ingredient: IngredientCreate,
                            file: UploadFile | None = File(None),
                            session: AsyncSession = Depends(get_session)) -> JSONResponse:
    return await IngredientService.create(ingredient, file, session)

@router.get("/get_ingredients", response_model=list[IngredientResponse])
async def get_ingredient(session: AsyncSession = Depends(get_session)) -> Sequence[Ingredient]:
    return await IngredientService.get(session)

@router.patch("/update_ingredient/{ingredient_id}")
async def update_ingredient(ingredient_id: int,
                            ingredient: IngredientUpdate,
                            file: UploadFile | None = File(None),
                            session: AsyncSession = Depends(get_session)) -> JSONResponse:
    return await IngredientService.update(ingredient_id, ingredient, file, session)

