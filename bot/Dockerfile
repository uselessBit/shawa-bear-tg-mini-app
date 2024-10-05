FROM python:3.12

WORKDIR /bot

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "-m", "main"]
