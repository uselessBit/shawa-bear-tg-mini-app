import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.api.products.models import Product


@pytest.mark.asyncio()
async def test_create_product(db_session: AsyncSession, ac: AsyncClient):
    product_data = '{"name": "Test Product", "description": "A test product", "price": 100}'

    response = await ac.post(
        "/products/create_product",
        files={"product": (None, product_data, "application/json")},
    )

    assert response.status_code == 200
    assert response.json() == {"message": "Product created successfully"}

    async with db_session as session:
        query = select(Product).where(Product.name == "Test Product")
        result = await session.execute(query)
        product = result.scalar()

    assert product is not None
    assert product.name == "Test Product"
