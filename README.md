# Telegram mini app

#### Stack:
- FastAPI
- Postgres
- ReactJS
- ChakraUI
- Aiogram3

#### Architecture

```yaml
├── src
    ├── clients/
    ├── server/
      ├── routers/
      ├── app.py
      ├── handle_errors.py
    ├── services/         
    ├── settings/
    ├── container.py
    ├── __main__.py
└──  tests
```

## Local Developing

### Backend

Create venv
```bash
python3 -m venv .venv
```

Activate env

Mac/Linux:
```bash
source .venv/bin/activate
```
Windows:
```bash
.venv/scripts/activate
```
Apply migrations
```bash
alembic upgrade head
```
Run uvicorn

Mac/Linux:
```bash
uvicorn src.server.app:create_application --factory --host 0.0.0.0 --port 443 --ssl-keyfile localhost-key.pem --ssl-certfile localhost.pem
```
Windows:
```bash
uvicorn src.server.app:create_application --factory --host 127.0.0.1 --port 443 --ssl-keyfile localhost-key.pem --ssl-certfile localhost.pem
```


Or just use(only for Mac/Linux)
```bash
docker-compose up --build
```