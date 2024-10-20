FROM python:3.11

WORKDIR /backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

#docker run -p 443:443 tg-mini-app