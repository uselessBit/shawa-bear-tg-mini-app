from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.clients.database.base import Base

class Product(Base):
    __tablename__ = "products"
    __table_args__ = {"extend_existing": True}

    product_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(nullable=False)
    image_url: Mapped[str] = mapped_column(nullable=True)

    prices: Mapped[list["Price"]] = relationship(back_populates="product")
    ingredients: Mapped[list["Ingredient"]] = relationship(back_populates="products", secondary="product_ingredient")


class ProductIngredient(Base):
    __tablename__ = "product_ingredient"

    product_id: Mapped[int] = mapped_column(ForeignKey("products.product_id"), primary_key=True)
    ingredient_id: Mapped[int] = mapped_column(ForeignKey("ingredients.ingredient_id"), primary_key=True)