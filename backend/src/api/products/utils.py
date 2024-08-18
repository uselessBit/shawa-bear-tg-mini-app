import os
import uuid
from fastapi import UploadFile


async def save_image(file: UploadFile, directory="../../../../frontend/media"):
    filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]

    base_dir = os.path.dirname(__file__)
    abs_directory = os.path.join(base_dir, directory)

    os.makedirs(abs_directory, exist_ok=True)

    file_path = os.path.join(abs_directory, filename)

    with open(file_path, "wb") as buffer:
        while True:
            data = await file.read(1024)
            if not data:
                break
            buffer.write(data)

    return filename
