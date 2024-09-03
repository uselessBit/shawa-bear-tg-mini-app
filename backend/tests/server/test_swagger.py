import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_openapi(ac: AsyncClient):
    response = await ac.get("/openapi.json")
    assert response.status_code == 200

@pytest.mark.asyncio
async def test_docs(ac: AsyncClient):
    response = await ac.get("/docs")
    assert response.status_code == 200
