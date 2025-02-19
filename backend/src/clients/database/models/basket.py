from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.clients.database.base import Base


class Basket(Base):
    __tablename__ = "baskets"

    basket_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(nullable=False)

    items: Mapped[list["BasketItem"]] = relationship(
        "BasketItem", back_populates="basket", cascade="all, delete-orphan"
    )
    orders: Mapped[list["Order"]] = relationship("Order", back_populates="basket", cascade="all, delete-orphan")  # noqa: F821


class BasketItem(Base):
    __tablename__ = "basket_items"

    basket_item_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    basket_id: Mapped[int] = mapped_column(ForeignKey("baskets.basket_id", ondelete="CASCADE"), nullable=False)
    price_id: Mapped[int] = mapped_column(ForeignKey("prices.price_id", ondelete="CASCADE"), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False, default=1)

    basket: Mapped["Basket"] = relationship("Basket", back_populates="items")
    price: Mapped["Price"] = relationship("Price", back_populates="basket_items")  # noqa: F821
