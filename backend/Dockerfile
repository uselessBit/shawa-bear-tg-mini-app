FROM python:3.11

WORKDIR /backend

RUN pip install --no-cache-dir poetry

RUN poetry config virtualenvs.in-project true && \
    poetry config virtualenvs.create false

COPY pyproject.toml poetry.lock /backend/

RUN poetry install --no-interaction --only main --no-root

COPY . .
