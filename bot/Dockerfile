FROM python:3.11

WORKDIR /bot

RUN pip install --no-cache-dir poetry

RUN poetry config virtualenvs.in-project true && \
    poetry config virtualenvs.create false

COPY pyproject.toml poetry.lock /bot/

RUN poetry install --no-interaction --only main --no-root

COPY . .

CMD ["python3", "-m", "src"]