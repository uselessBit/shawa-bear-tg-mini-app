import os
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

async def delete_image(filename: str, directory: str = "../../../../frontend/media") -> None:
    base_dir = Path(__file__).parent
    abs_directory = base_dir / directory
    file_path = abs_directory / filename

    if file_path.exists() and file_path.is_file():
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"An error occurred while deleting file {filename}: {e}")
    else:
        print(f"File {filename} does not exist.")

