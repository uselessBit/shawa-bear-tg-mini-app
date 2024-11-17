#!/bin/sh
alembic upgrade head

uvicorn src.api.server.app:create_application --factory --host 0.0.0.0 --port 443 --ssl-keyfile localhost-key.pem --ssl-certfile localhost.pem
