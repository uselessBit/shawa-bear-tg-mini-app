from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from src.container import DependencyContainer
from src.server.handle_erros import patch_exception_handlers
from src.server.routers.v1.routers import api_v1_router


class CustomFastAPI(FastAPI):
    container: DependencyContainer


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


def create_application() -> CustomFastAPI:
    server = CustomFastAPI(title="tg-mini-app")
    server.container = DependencyContainer()
    server.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    patch_exception_handlers(app=server)
    server.mount("/media", StaticFiles(directory="/media"), name="media")
    server.include_router(api_v1_router)
    return server
