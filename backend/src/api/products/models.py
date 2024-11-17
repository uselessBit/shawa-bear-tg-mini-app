from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


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


class Ingredient(Base):
    __tablename__ = "ingredients"

    ingredient_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    image_url: Mapped[str] = mapped_column(nullable=True)

    products: Mapped[list["Product"]] = relationship(back_populates="ingredients", secondary="product_ingredient")


class Size(Base):
    __tablename__ = "sizes"

    size_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)
    grams: Mapped[int] = mapped_column(nullable=False)

    prices: Mapped[list["Price"]] = relationship(back_populates="size")


class Price(Base):
    __tablename__ = "prices"

    price_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    size_id: Mapped[int] = mapped_column(ForeignKey("sizes.size_id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.product_id"))
    price: Mapped[float] = mapped_column(nullable=False)

    product: Mapped["Product"] = relationship(back_populates="prices")
    size: Mapped["Size"] = relationship(back_populates="prices")
    basket_items: Mapped[list["BasketItem"]] = relationship("BasketItem", back_populates="price")
