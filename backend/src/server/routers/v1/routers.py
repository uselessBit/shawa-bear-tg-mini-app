from fastapi import APIRouter

from src.server.routers.v1 import (
    basket_router,
    ingredient_router,
    order_router,
    price_router,
    product_router,
    size_router,
    user_router,
)

api_v1_router = APIRouter(prefix="/api/v1")
api_v1_router.include_router(size_router.router)
api_v1_router.include_router(ingredient_router.router)
api_v1_router.include_router(product_router.router)
api_v1_router.include_router(price_router.router)
api_v1_router.include_router(basket_router.router)
api_v1_router.include_router(order_router.router)
api_v1_router.include_router(user_router.router)
