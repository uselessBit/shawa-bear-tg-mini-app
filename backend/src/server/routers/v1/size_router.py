from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from src.container import container
from src.services.size.interface import SizeServiceI
from src.services.size.schemas import SizeCreate, SizeResponse, SizeUpdate
from src.services.static import create_message, delete_message, update_message

size_tag = "Size"
router = APIRouter(prefix="/size", tags=[size_tag])


async def get_size_service() -> SizeServiceI:
    return container.size_service()


@router.post("/create_size")
async def create_size(size: SizeCreate, size_service: SizeServiceI = Depends(get_size_service)) -> JSONResponse:
    await size_service.create(size)
    return JSONResponse(content={"message": create_message.format(entity=size_tag)}, status_code=200)


@router.get("/get_sizes", response_model=list[SizeResponse])
async def get_sizes(size_service: SizeServiceI = Depends(get_size_service)) -> list[SizeResponse]:
    return await size_service.get_all()


@router.patch("/update_size/{size_id}")
async def update_size(
    size_id: int, size: SizeUpdate, size_service: SizeServiceI = Depends(get_size_service)
) -> JSONResponse:
    await size_service.update(size_id, size)
    return JSONResponse(content={"message": update_message.format(entity=size_tag)}, status_code=200)


@router.delete("/delete_size/{size_id}")
async def delete_size(size_id: int, size_service: SizeServiceI = Depends(get_size_service)) -> JSONResponse:
    await size_service.delete(size_id)
    return JSONResponse(content={"message": delete_message.format(entity=size_tag)}, status_code=200)
