from fastapi import APIRouter, Depends
from dependency_injector.wiring import Provide, inject
from starlette.responses import JSONResponse
from src.container import container
from fastapi import UploadFile, File

from src.services.ingredient.interface import IngredientServiceI
from src.services.ingredient.schemas import IngredientResponse, IngredientUpdate, IngredientCreate

router = APIRouter(prefix="/ingredient", tags=["Ingredient"])

async def get_ingredient_service() -> IngredientServiceI:
    return container.order_service()

@router.post("/create_ingredient")
async def create_ingredient(
        ingredient: IngredientCreate,
        file: UploadFile | None = File(None),
        ingredient_service: IngredientServiceI = Depends(get_ingredient_service),
) -> JSONResponse:
    await ingredient_service.create(ingredient, file)
    return JSONResponse(content={"message": "Ingredient created successfully"}, status_code=200)


@router.get("/get_ingredients", response_model=list[IngredientResponse])
async def get_ingredient(
        ingredient_service: IngredientServiceI = Depends(get_ingredient_service),
) -> list[IngredientResponse]:
    return await ingredient_service.get()


@router.patch("/update_ingredient/{ingredient_id}")
async def update_ingredient(
        ingredient_id: int,
        ingredient: IngredientUpdate,
        file: UploadFile | None = File(None),
        ingredient_service: IngredientServiceI = Depends(get_ingredient_service),
) -> JSONResponse:
    await ingredient_service.update(ingredient_id, ingredient, file)
    return JSONResponse(content={"message": "Ingredient updated successfully"}, status_code=200)