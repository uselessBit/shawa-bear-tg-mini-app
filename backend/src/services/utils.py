import logging
import uuid
from collections.abc import Callable
from pathlib import Path
from typing import ParamSpec, TypeVar

import aiofiles
import anyio
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from src.services.errors import KeyAlreadyExistsError
from src.services.schemas import Image

logger = logging.getLogger(__name__)
P = ParamSpec("P")
T = TypeVar("T")


async def save_image(image: Image, directory: str | None = "media") -> str:
    unique_filename = f"{uuid.uuid4()}{Path(image.filename).suffix}"

    base_dir = Path(__file__).resolve().parent.parent.parent.parent
    abs_directory = base_dir / directory

    abs_directory.mkdir(parents=True, exist_ok=True)

    file_path = abs_directory / unique_filename

    async with aiofiles.open(file_path, "wb") as buffer:
        await buffer.write(image.file_bytes)

    return unique_filename


async def delete_image(filename: str, directory: str | None = "media") -> None:
    base_dir = Path(__file__).resolve().parent.parent.parent.parent
    abs_directory = base_dir / directory
    file_path = abs_directory / filename

    if file_path.exists() and file_path.is_file():
        try:
            await anyio.to_thread.run_sync(file_path.unlink)
        except Exception as e:
            logger.exception("An error occurred while deleting file %s: %s", filename, e)
    else:
        logger.exception("File %s does not exist.", filename)


async def try_commit(
    session: AsyncSession,
    entity_name: str,
    callback: Callable[P, T] | None = None,
    *callback_args: P.args,
    **callback_kwargs: P.kwargs,
) -> None:
    try:
        await session.commit()
    except IntegrityError as e:
        await session.rollback()
        if callback:
            await callback(*callback_args, **callback_kwargs)
        raise KeyAlreadyExistsError(name=entity_name) from e
