from fastapi import APIRouter, Depends, File, UploadFile
from starlette.responses import JSONResponse

from src.clients.database.models.product import Product
from src.container import container
from src.services.product.interface import ProductServiceI
from src.services.product.schemas import ProductCreate, ProductResponse, ProductUpdate
from src.services.schemas import Image
from src.services.static import create_message, delete_message, update_message

product_tag = "Product"
router = APIRouter(prefix="/product", tags=[product_tag])


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
    return JSONResponse(content={"message": create_message.format(entity=product_tag)}, status_code=200)


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
    return JSONResponse(content={"message": update_message.format(entity=product_tag)}, status_code=200)


@router.delete("/delete_product/{product_id}")
async def delete_ingredient(
    product_id: int, product_service: ProductServiceI = Depends(get_product_service)
) -> JSONResponse:
    await product_service.delete(product_id)
    return JSONResponse(content={"message": delete_message.format(entity=product_tag)}, status_code=200)
