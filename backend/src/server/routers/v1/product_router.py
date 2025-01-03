from fastapi import APIRouter, Depends, File, UploadFile
from starlette.responses import JSONResponse

from src.clients.database.models.product import Product
from src.container import container
from src.services.product.interface import ProductServiceI
from src.services.product.schemas import ProductCreate, ProductResponse, ProductUpdate
from src.services.schemas import Image

router = APIRouter(prefix="/product", tags=["Product"])


async def get_product_service() -> ProductServiceI:
    return container.product_service()


@router.post("/create_product")
async def create_product(
    product: ProductCreate,
    file: UploadFile | None = File(None),
    product_service: ProductServiceI = Depends(get_product_service),
) -> JSONResponse:
    image = Image()
    if file:
        image.file_bytes = await file.read()
        image.filename = file.filename
    await product_service.create(product, image)
    return JSONResponse(content={"message": "Product created successfully"}, status_code=200)


@router.get("/get_products", response_model=list[ProductResponse])
async def get_products(
    product_service: ProductServiceI = Depends(get_product_service),
) -> list[ProductResponse]:
    return await product_service.get_all()


@router.get("/get_product_by_name/{product_name}", response_model=ProductResponse)
async def get_product_by_name(
    product_name: str,
    product_service: ProductServiceI = Depends(get_product_service),
) -> Product:
    return await product_service.get_by_name(product_name)


@router.patch("/update_product/{product_id}")
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    file: UploadFile | None = File(None),
    product_service: ProductServiceI = Depends(get_product_service),
) -> JSONResponse:
    image = Image()
    if file:
        image.file_bytes = await file.read()
        image.filename = file.filename
    await product_service.update(product_id, product_data, image)
    return JSONResponse(content={"message": "Product updated successfully"}, status_code=200)
