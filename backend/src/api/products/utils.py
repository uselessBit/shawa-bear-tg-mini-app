import uuid
from pathlib import Path

import aiofiles
from fastapi import UploadFile


async def save_image(file: UploadFile, directory: str = "../../../../frontend/media") -> str:
    filename = f"{uuid.uuid4()}{Path(file.filename).suffix}"

    base_dir = Path(__file__).parent
    abs_directory = base_dir / directory

    abs_directory.mkdir(parents=True, exist_ok=True)

    file_path = abs_directory / filename

    async with aiofiles.open(file_path, "wb") as buffer:
        while True:
            data = await file.read(1024)
            if not data:
                break
            await buffer.write(data)

    return filename
