from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Product(Base):
    __tablename__ = "products"
    __table_args__ = {"extend_existing": True}

    product_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.category_id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    image_url: Mapped[str] = mapped_column(nullable=True)

    prices: Mapped[list["Price"]] = relationship(back_populates="product", cascade="all, delete-orphan")  # noqa: F821
    category: Mapped["Category"] = relationship(back_populates="products")  # noqa: F821
    ingredients: Mapped[list["Ingredient"]] = relationship(back_populates="products", secondary="product_ingredient")  # noqa: F821


class ProductIngredient(Base):
    __tablename__ = "product_ingredient"

    product_id: Mapped[int] = mapped_column(ForeignKey("products.product_id", ondelete="CASCADE"), primary_key=True)
    ingredient_id: Mapped[int] = mapped_column(ForeignKey("ingredients.ingredient_id", ondelete="CASCADE"), primary_key=True)
