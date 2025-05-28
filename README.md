# ShawaBear

View layout at [Figma](https://www.figma.com/design/XvUYgGWgPnsX1pYS7OPXPV/%D0%A8%D0%B0%D1%83%D1%80%D0%BC%D0%B0?node-id=0-1&t=pZNpopnCjBgGSWh9-1)

#### Stack:
- FastAPI
- Postgres
- ReactTS
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
```

## Local Developing

### Backend

Just use
```bash
docker compose up --build
```

### Frontend

Go to frontend folder
```bash
cd /frontend
```

Install packages
```bash
npm i
```

Run project build
```bash
npm run dev
```
i