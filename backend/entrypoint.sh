#!/bin/sh
alembic upgrade head

uvicorn src.server.app:create_application --factory --host 0.0.0.0 --port 443 --ssl-keyfile localhost-key.pem --ssl-certfile localhost.pem
# uvicorn src.server.app:create_application --factory --host 127.0.0.1 --port 443 --ssl-keyfile localhost-key.pem --ssl-certfile localhost.pem
