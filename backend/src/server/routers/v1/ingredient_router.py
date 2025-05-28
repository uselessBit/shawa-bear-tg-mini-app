from http import HTTPStatus

from fastapi import APIRouter, Depends, File, UploadFile
from starlette.responses import JSONResponse

from src.container import container
from src.services.ingredient.interface import IngredientServiceI
from src.services.ingredient.schemas import IngredientCreate, IngredientResponse, IngredientUpdate
from src.services.schemas import Image
from src.services.static import create_message, delete_message, update_message

ingredient_tag = "Ingredient"
router = APIRouter(prefix="/ingredient", tags=[ingredient_tag])


async def get_ingredient_service() -> IngredientServiceI:
    return container.ingredient_service()


@router.post("/", response_model=IngredientResponse)
async def create(
    ingredient: IngredientCreate,
    file: UploadFile | None = File(None),
    ingredient_service: IngredientServiceI = Depends(get_ingredient_service),
) -> JSONResponse:
    image = Image()
    if file:
        image.file_bytes = await file.read()
        image.filename = file.filename
    ingredient = await ingredient_service.create(ingredient, image)
    return JSONResponse(
        content=ingredient.model_dump(), status_code=HTTPStatus.CREATED
    )


@router.get("/", response_model=list[IngredientResponse])
async def get_all(
    ingredient_service: IngredientServiceI = Depends(get_ingredient_service),
) -> list[IngredientResponse]:
    return await ingredient_service.get()


@router.patch("/{ingredient_id}")
async def update(
    ingredient_id: int,
    ingredient: IngredientUpdate,
    file: UploadFile | None = File(None),
    ingredient_service: IngredientServiceI = Depends(get_ingredient_service),
) -> JSONResponse:
    image = Image()
    if file:
        image.file_bytes = await file.read()
        image.filename = file.filename
    await ingredient_service.update(ingredient_id, ingredient, image)
    return JSONResponse(content={"message": update_message.format(entity=ingredient_tag)}, status_code=200)


@router.delete("/{ingredient_id}")
async def delete(
    ingredient_id: int, ingredient_service: IngredientServiceI = Depends(get_ingredient_service)
) -> JSONResponse:
    await ingredient_service.delete(ingredient_id)
    return JSONResponse(content={"message": delete_message.format(entity=ingredient_tag)}, status_code=200)
