alembic upgrade head

uvicorn src.api.main:app --host 0.0.0.0 --port 443 --ssl-keyfile localhost-key.pem --ssl-certfile localhost.pem