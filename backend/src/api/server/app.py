from http import HTTPStatus

from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles

from src.api.server.handle_erros import patch_exception_handlers
from src.container import DependencyContainer
from src.api.basket.routers import router as basket_router
from src.api.orders.routers import router as orders_router
from src.api.products.routers import router as products_router
from src.api.users.routers import router as users_router
from starlette.middleware.cors import CORSMiddleware
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
    server.mount("/media", StaticFiles(directory="./media"), name="media")
    server.include_router(users_router)
    server.include_router(products_router)
    server.include_router(basket_router)
    server.include_router(orders_router)
    return server
