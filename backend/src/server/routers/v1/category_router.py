from http import HTTPStatus

from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.category.interface import CategoryServiceI
from src.services.category.schemas import CategoryCreate, CategoryResponse, CategoryUpdate
from src.services.static import create_message, delete_message, update_message

category_tag = "Category"
router = APIRouter(prefix="/category", tags=[category_tag])


async def get_category_service() -> CategoryServiceI:
    return container.category_service()


@router.post("/")
async def create(
    category: CategoryCreate, category_service: CategoryServiceI = Depends(get_category_service)
) -> JSONResponse:
    await category_service.create(category)
    return JSONResponse(content={"message": create_message.format(entity=category_tag)}, status_code=HTTPStatus.CREATED)


@router.get("/", response_model=list[CategoryResponse])
async def get_all(category_service: CategoryServiceI = Depends(get_category_service)) -> list[CategoryResponse]:
    return await category_service.get_all()


@router.patch("/{category_id}")
async def update(
    category_id: int, category: CategoryUpdate, category_service: CategoryServiceI = Depends(get_category_service)
) -> JSONResponse:
    await category_service.update(category_id, category)
    return JSONResponse(content={"message": update_message.format(entity=category_tag)}, status_code=200)


@router.delete("/{category_id}")
async def delete(category_id: int, category_service: CategoryServiceI = Depends(get_category_service)) -> JSONResponse:
    await category_service.delete(category_id)
    return JSONResponse(content={"message": delete_message.format(entity=category_tag)}, status_code=200)
