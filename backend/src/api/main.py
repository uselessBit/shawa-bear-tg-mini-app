import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from users.routers import router as users_router
from products.routers import router as products_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(products_router)

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True, port=8000, ssl_keyfile="../../localhost-key.pem",
                ssl_certfile="../../localhost.pem")
