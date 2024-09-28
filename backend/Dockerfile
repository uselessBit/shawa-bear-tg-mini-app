FROM python:3.12

WORKDIR /backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "localhost-key.pem", "--ssl-certfile", "localhost.pem"]

#docker run -p 443:443 tg-mini-app