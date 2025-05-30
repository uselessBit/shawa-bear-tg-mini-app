from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Order(Base):
    __tablename__ = "orders"

    order_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(nullable=False)
    basket_id: Mapped[int] = mapped_column(ForeignKey("baskets.basket_id", ondelete="CASCADE"), nullable=False)
    order_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    total_price: Mapped[float] = mapped_column(Float, nullable=False)
    payment_option: Mapped[str] = mapped_column(String(50), nullable=False, default="сard")
    time_taken: Mapped[str] = mapped_column(String(50), nullable=False)
    comment: Mapped[str] = mapped_column(nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="created")
    first_name: Mapped[str] = mapped_column(String(50), nullable=True)
    address: Mapped[str] = mapped_column(String(50), nullable=True)
    phone: Mapped[str] = mapped_column(String(50), nullable=True)
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )
    basket: Mapped["Basket"] = relationship("Basket", back_populates="orders")  # noqa: F821

class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.order_id", ondelete="CASCADE"), nullable=False)
    price_id: Mapped[int] = mapped_column(ForeignKey("prices.price_id", ondelete="CASCADE"), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False, default=1)

    order: Mapped["Order"] = relationship("Order", back_populates="items")
    price: Mapped["Price"] = relationship("Price", back_populates="order_items")  # noqa: F821
    excluded_ingredients: Mapped[list["Ingredient"]] = relationship(
        "Ingredient",
        secondary="order_item_excluded_ingredients",
    )

class OrderItemExcludedIngredient(Base):
    __tablename__ = "order_item_excluded_ingredients"

    order_item_id: Mapped[int] = mapped_column(
        ForeignKey("order_items.order_item_id", ondelete="CASCADE"),
        primary_key=True
    )
    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.ingredient_id", ondelete="CASCADE"),
        primary_key=True
    )